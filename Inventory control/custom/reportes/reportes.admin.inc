<?php


/**
 * Return a themed table for product reports.
 *
 * Straight duplication of theme_table, but our row handling is different.
 *
 * @see theme_table()
 * @ingroup themeable
 */
function theme_reportes_product_table($variables) {
  $header = $variables['header'];
  $rows = $variables['rows'];
  $attributes = $variables['attributes'];
  $caption = $variables['caption'];
  $colgroups = $variables['colgroups'];
  $sticky = $variables['sticky'];
  $empty = $variables['empty'];

  // Add sticky headers, if applicable.
  if (count($header) && $sticky) {
    drupal_add_js('misc/tableheader.js');
    // Add 'sticky-enabled' class to the table to identify it for JS.
    // This is needed to target tables constructed by this function.
    $attributes['class'][] = 'sticky-enabled';
  }

  $output = '<table' . drupal_attributes($attributes) . ">\n";

  if (isset($caption)) {
    $output .= '<caption>' . $caption . "</caption>\n";
  }

  // Format the table columns:
  if (count($colgroups)) {
    foreach ($colgroups as $number => $colgroup) {
      $attributes = array();

      // Check if we're dealing with a simple or complex column
      if (isset($colgroup['data'])) {
        foreach ($colgroup as $key => $value) {
          if ($key == 'data') {
            $cols = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $cols = $colgroup;
      }

      // Build colgroup
      if (is_array($cols) && count($cols)) {
        $output .= ' <colgroup' . drupal_attributes($attributes) . '>';
        $i = 0;
        foreach ($cols as $col) {
          $output .= ' <col' . drupal_attributes($col) . ' />';
        }
        $output .= " </colgroup>\n";
      }
      else {
        $output .= ' <colgroup' . drupal_attributes($attributes) . " />\n";
      }
    }
  }

  // Add the 'empty' row message if available.
  if (!count($rows) && $empty) {
    $header_count = 0;
    foreach ($header as $header_cell) {
      if (is_array($header_cell)) {
        $header_count += isset($header_cell['colspan']) ? $header_cell['colspan'] : 1;
      }
      else {
        $header_count++;
      }
    }
    $rows[] = array(array('data' => $empty, 'colspan' => $header_count, 'class' => array('empty', 'message')));
  }

  // Format the table header:
  if (count($header)) {
    $ts = tablesort_init($header);
    // HTML requires that the thead tag has tr tags in it follwed by tbody
    // tags. Using ternary operator to check and see if we have any rows.
    $output .= (count($rows) ? ' <thead><tr>' : ' <tr>');
    foreach ($header as $cell) {
      $cell = tablesort_header($cell, $header, $ts);
      $output .= _theme_table_cell($cell, TRUE);
    }
    // Using ternary operator to close the tags based on whether or not there are rows
    $output .= (count($rows) ? " </tr></thead>\n" : "</tr>\n");
  }
  else {
    $ts = array();
  }

  // Format the table rows:
  if (count($rows)) {
    $output .= "<tbody>\n";
    $flip = array('even' => 'odd', 'odd' => 'even');
    $class = 'even';
    foreach ($rows as $number => $row) {
      $attributes = array();

      // Check if we're dealing with a simple or complex row
      if (isset($row['data'])) {
        foreach ($row as $key => $value) {
          if ($key == 'data') {
            $cells = $value;
          }
          // The following elseif clause is where we differ from theme_table()
          elseif ($key == 'primary') {
            $class = $flip[$class];
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $cells = $row;
      }
      if (count($cells)) {
        // Add odd/even class
        // We don't flip here like theme_table(), because we did that above.
        $attributes['class'][] = $class;

        // Build row
        $output .= ' <tr' . drupal_attributes($attributes) . '>';
        $i = 0;
        foreach ($cells as $cell) {
          $cell = tablesort_cell($cell, $header, $ts, $i++);
          $output .= _theme_table_cell($cell);
        }
        $output .= " </tr>\n";
      }
    }
    $output .= "</tbody>\n";
  }

  $output .= "</table>\n";
  return $output;
}

/**
 * Stores a CSV file for a report in Drupal's cache to be retrieved later.
 *
 * @param $report_id
 *   A unique string that identifies the report of the CSV file.
 * @param $rows
 *   The rows (table header included) that make CSV file.
 *
 * @return
 *   An array containing the values need to build URL that return the CSV file
 *   of the report and the CSV data itself.
 */
function reportes_store_csv($report_id, $rows) {
  global $user;
  $csv_output = '';
  $user_id = empty($user->uid) ? session_id() : $user->uid;
  foreach ($rows as $row) {
    foreach ($row as $index => $column) {
      $row[$index] = '"' . str_replace('"', '""', $column) . '"';
    }
    $csv_output .= implode(',', $row) . "\n";
  }
  cache_set('reportes_' . $report_id . '_' . $user_id, $csv_output, 'cache', REQUEST_TIME + 86400);
  return array('user' => $user_id, 'report' => $report_id, 'csv' => $csv_output);
}

/**
 * Retrieves a cached CSV report & send its data.
 *
 * @param $report_id
 *   A unique string that identifies the specific report CSV to retrieve.
 * @param $user_id
 *   The user id to who's retrieving the report:
 *   - uid: Equals uid for authenticated users.
 *   - sid: Equals session_id for anonymous users.
 */
function reportes_get_csv($report_id, $user_id) {
  global $user;
  $user_check = empty($user->uid) ? session_id() : $user->uid;
  $csv_data = cache_get('reportes_' . $report_id . '_' . $user_id, 'cache');

  if (!$csv_data || $user_id != $user_check) {
    drupal_set_message(t("The CSV data could not be retrieved. It's possible the data might have expired. Refresh the report page and try to retrieve the CSV file again."), 'error');
    drupal_not_found();
    exit();
  }
  else {
    ob_end_clean();
    $http_headers = array(
      'Pragma' => 'private',
      'Expires' => '0',
      'Cache-Control' => 'private, must-revalidate',
      'Content-Transfer-Encoding' => 'binary',
      'Content-Length' => strlen($csv_data->data),
      'Content-Disposition' => 'attachment; filename="' . $report_id . '.csv"',
      'Content-Type' => 'text/csv'
    );
    foreach ($http_headers as $header => $value) {
      $value = preg_replace('/\r?\n(?!\t| )/', '', $value);
      drupal_add_http_header($header, $value);
    }

    print $csv_data->data;
    exit();
  }
}


/**
 * Returns a list of timespans for subreports over that report's time span.
 *
 * To be used with a given time span for a report and specified interval for
 * subreports.
 *
 * @param $start
 *   A UNIX timestamp representing the time to start the report.
 * @param $end
 *   A UNIX timestamp representing the time to end the report.
 * @param $interval
 *   Text representing the time span of the subreport (e.g. 'day', 'week').
 *
 * @return
 *   An array of keyed arrays with the following values:
 *   - start: The starting point of the sub report.
 *   - end: The ending point of the sub report.
 */
function reportes_subreport_intervals($start, $report_end, $interval) {
  $subreports = array();

  while ($start < $report_end) {
    $end = strtotime('+1 ' . $interval, $start) - 1;
    $subreports[] = array(
      'start' => $start,
      'end' => min($end, $report_end),
    );

    $start = $end + 1;
  }

  return $subreports;
}
