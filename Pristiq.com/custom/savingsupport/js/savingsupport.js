// <?php
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 *
 * hide or show the different fields dependent of the user choices.
 */
// <?php
jQuery(document).ready(function() {

    var yearsOld = false;
    var displayPlease = false;
    var filter = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;

    jQuery('.webform-component--savings-contact-information legend:first').append('<div id="error-contend"></div>');

    /*validate form*/
    jQuery('.form-submit').click(function() {

        var formsIdPersonal = '#edit-submitted-savings-contact-information-personal-information-';
        var formsIdMailing = '#edit-submitted-savings-contact-information-mailing-address-';
        var formError = false;
        var errorPerdonal = "<div class='error-group'>";

        if (jQuery(formsIdPersonal + 'q10005-a10005').val() == "") {
            jQuery(formsIdPersonal + 'q10005-a10005').addClass('error');
            errorPerdonal += '<strong>Error:</strong> Please enter your first name<br>'
            formError = true;
        } else if (!filter.test(jQuery(formsIdPersonal + 'q10005-a10005').val())) {
            jQuery(formsIdPersonal + 'q10005-a10005').addClass('error');
            errorPerdonal += '<strong>Error:</strong> Please enter your first name<br>'
            formError = true;
        } else {
            jQuery(formsIdPersonal + 'q10005-a10005').removeClass('error');
        }




        if (jQuery(formsIdPersonal + 'q10007-a10007').val() == "") {
            jQuery(formsIdPersonal + 'q10007-a10007').addClass('error');
            errorPerdonal += '<strong>Error:</strong> Please enter your last name<br>'
            formError = true;
        } else if (!filter.test(jQuery(formsIdPersonal + 'q10007-a10007').val())) {
            jQuery(formsIdPersonal + 'q10007-a10007').addClass('error');
            errorPerdonal += '<strong>Error:</strong> Please enter your last name<br>'
            formError = true;
        } else {
            jQuery(formsIdPersonal + 'q10007-a10007').removeClass('error');
        }


        if (jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').is(':checked')) {

            if (jQuery(formsIdPersonal + 'q10015-a10015').val() == "") {
                jQuery(formsIdPersonal + 'q10015-a10015').addClass('error');
                errorPerdonal += '<strong>Error:</strong> Please enter your e-mail.<br>'
                formError = true;
            } else {
                jQuery(formsIdPersonal + 'q10015-a10015').removeClass('error');
            }

            if (jQuery(formsIdPersonal + 'q10014-a10014').val() == "") {
                jQuery(formsIdPersonal + 'q10014-a10014').addClass('error');
                errorPerdonal += '<strong>Error:</strong> Your e-mail address does not match.<br>'
                formError = true;
            } else {
                jQuery(formsIdPersonal + 'q10014-a10014').removeClass('error');
            }

            if ((jQuery(formsIdPersonal + 'q10015-a10015').val() != "") || (jQuery(formsIdPersonal + 'q10014-a10014').val() != "")) {

                if (jQuery(formsIdPersonal + 'q10015-a10015').val() != jQuery(formsIdPersonal + 'q10014-a10014').val()) {
                    jQuery(formsIdPersonal + 'q10014-a10014').addClass('error');
                    jQuery(formsIdPersonal + 'q10015-a10015').addClass('error');
                    errorPerdonal += '<strong>Error:</strong> Your e-mail address does not match<br>'
                    formError = true;
                } else if ((jQuery(formsIdPersonal + 'q10015-a10015').val().indexOf('@', 0) == -1) || (jQuery(formsIdPersonal + 'q10015-a10015').val().indexOf('.', 0) == -1) || (jQuery(formsIdPersonal + 'q10014-a10014').val().indexOf('@', 0) == -1) || (jQuery(formsIdPersonal + 'q10014-a10014').val().indexOf('.', 0) == -1)) {
                    jQuery(formsIdPersonal + 'q10014-a10014').addClass('error');
                    jQuery(formsIdPersonal + 'q10015-a10015').addClass('error');
                    errorPerdonal += '<strong>Error:</strong> Please ensure you have entered an appropriate email address.<br>'
                } else {
                    jQuery(formsIdPersonal + 'q10014-a10014').removeClass('error');
                    jQuery(formsIdPersonal + 'q10015-a10015').removeClass('error');
                }
            }

        }


        if (jQuery(formsIdMailing + 'q10017-a10017').val() == "") {
            jQuery(formsIdMailing + 'q10017-a10017').addClass('error');
            errorPerdonal += '<strong>Error:</strong> Please enter your address<br>'
            formError = true;
        } else {
            jQuery(formsIdMailing + 'q10017-a10017').removeClass('error');
        }

        if ((jQuery(formsIdMailing + 'q10019-a10019').val() == "") || (jQuery(formsIdMailing + 'q10020-a10020').val() == "") || (jQuery(formsIdMailing + 'zip-code').val() == "")) {

            if (jQuery(formsIdMailing + 'q10019-a10019').val() == "") {
                jQuery(formsIdMailing + 'q10019-a10019').addClass('error');
            } else {
                jQuery(formsIdMailing + 'q10019-a10019').removeClass('error');
            }

            if (jQuery(formsIdMailing + 'q10020-a10020').val() == "null") {
                jQuery(formsIdMailing + 'q10020-a10020').addClass('error');
            } else {
                jQuery(formsIdMailing + 'q10020-a10020').removeClass('error');
            }

            if (jQuery(formsIdMailing + 'zip-code').val() == "") {
                jQuery(formsIdMailing + 'zip-code').addClass('error');
            } else {
                jQuery(formsIdMailing + 'zip-code').removeClass('error');
            }

            errorPerdonal += '<strong>Error:</strong>  Invalid City/State/Zip Code combination <br>'
            formError = true;

        }

        if (formError) {
            errorPerdonal += '</div>';
            jQuery('#error-contend').html(errorPerdonal);
            return false;
        } else {
            return true;
        }
    });



    //************************************* Get Savings & Support: Learn More ******************************************************//

    jQuery("#edit-submitted-select-one-or-both-q15667-a25508-1 + label").click(function(event) {
        event.preventDefault();
        jQuery('.webform-component--select-one-or-both--learn-more-saving').fadeIn();
        jQuery('.webform-component--select-one-or-both--Q15667-A25508').attr('style', 'margin-bottom: 125px');
        jQuery('.learn_more_box').fadeIn();
    });

    jQuery("#edit-submitted-select-one-or-both-q15664-a25502-1 + label").click(function(event) {
        event.preventDefault();
        jQuery('.webform-component--select-one-or-both--learn-more-inside').fadeIn();
        jQuery('.webform-component--select-one-or-both--Q15667-A25508').attr('style', 'margin-bottom: 125px');
        jQuery('.learn_more_box').fadeIn();
    });

    jQuery(".webform-component--select-one-or-both--learn-more-saving .learn-btn-close").click(function(event) {
        event.preventDefault();
        jQuery('.webform-component--select-one-or-both--learn-more-saving').fadeOut();
        jQuery('.webform-component--select-one-or-both--Q15667-A25508').attr('style', 'margin: 0');
    });

    jQuery(".webform-component--select-one-or-both--learn-more-inside .learn-btn-close").click(function(event) {
        event.preventDefault();
        jQuery('.webform-component--select-one-or-both--learn-more-inside').fadeOut();
        jQuery('.webform-component--select-one-or-both--Q15667-A25508').attr('style', 'margin: 0');
    });

    //************************************* PRISTIQ Saving Card ******************************************************//
    jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').click(function() {
        var savingCart = jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked');
        var insideDepression = jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').is(':checked');
        if (yearsOld) {
            if (savingCart || insideDepression) {
                jQuery('.webform-component--message1').fadeOut();
                if (jQuery('#edit-submitted-registration-q13923-a20681-1').is(':checked')) {
                    jQuery('.webform-component--registration--Q14024-A21043').fadeIn();
                }
            } else {
                jQuery('.webform-component--message1').fadeIn();
                jQuery('.webform-component--registration--Q14024-A21043').fadeOut();
                close_all();
            }
        } else {

            if (savingCart || insideDepression) {
                jQuery('.webform-component--message1').fadeOut();
            } else {
                //jQuery('.webform-component--message1').fadeIn();
                close_all();
            }
        }
        if (
                (jQuery('.webform-component--savings-contact-information').attr('style') === 'display: block;') ||
                (jQuery('.webform-component--registration--options-eligibility-text').attr('style') === 'display: block;')
                ) {
            if (savingCart) {
                jQuery('.webform-component--registration--options-eligibility-text').fadeIn();
                jQuery('.webform-component--registration--Q15365-A24663').fadeIn();
            } else {
                displayPlease = true;
                jQuery('.webform-component--registration--options-eligibility-text').fadeOut();
                jQuery('.webform-component--registration--Q15365-A24663').fadeOut();
            }
        }

        if (displayPlease) {
            if (savingCart) {
                jQuery('.webform-component--registration--options-eligibility-text').fadeIn();
                jQuery('.webform-component--registration--Q15365-A24663').fadeIn();
            }
        }

    });


    //************************************** Inside Depression  ******************************************************//
    jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').click(function() {
        var savingCart = jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked');
        var insideDepression = jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').is(':checked');
        if (yearsOld) {
            if (savingCart || insideDepression) {
                jQuery('.webform-component--message1').fadeOut();
                if (jQuery('#edit-submitted-registration-q13923-a20681-1').is(':checked')) {
                    jQuery('.webform-component--registration--Q14024-A21043').fadeIn();
                }
            } else {
                jQuery('.webform-component--message1').fadeIn();
                jQuery('.webform-component--registration--Q14024-A21043').fadeOut();
                close_all();
            }
        } else {
            if (savingCart || insideDepression) {
                jQuery('.webform-component--message1').fadeOut();
            } else {
                //jQuery('.webform-component--message1').fadeIn();
                close_all();
            }
        }
    })


    //*********************************** Are you 18 button************************************************************//
    jQuery('#edit-submitted-registration-q13923-a20681-1').click(function() {
        var savingCart = jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked');
        var insideDepression = jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').is(':checked');
        if (savingCart || insideDepression) {
            jQuery('.webform-component--registration--Q14024-A21043').fadeIn();
            jQuery('.webform-component--registration--are-you-18-years-or-older-error').fadeOut();
        } else {
            jQuery('.webform-component--message1').fadeIn();
            jQuery('.webform-component--registration--are-you-18-years-or-older-error').fadeOut();
            yearsOld = true;
        }

    });


    //*********************************** Are not you 18 button************************************************************//
    jQuery('#edit-submitted-registration-q13923-a20681-2').click(function() {
        /*var savingCart          = jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked');
         var insideDepression    = jQuery('#edit-submitted-select-one-or-both-q15664-a25502-1').is(':checked');
         if( savingCart || insideDepression ){
         jQuery('.webform-component--message1').fadeOut();
         } else {
         jQuery('.webform-component--message1').fadeIn();
         }*/
        yearsOld = false;
        jQuery('.webform-component--message1').fadeOut();
        jQuery('.webform-component--registration--Q14024-A21043').fadeOut();
        jQuery('.webform-component--registration--are-you-18-years-or-older-error').fadeIn();
        close_all();
    });


    //*********************************** Are you currently taking PRISTIQ? yes ************************************************************//
    jQuery('#edit-submitted-registration-q14024-a21043-1').click(function() {
        jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').fadeIn();

        jQuery('.webform-component--registration--Q15668-A25512').fadeOut();

        jQuery('.webform-component--registration--options-eligibility-text').fadeOut();
        jQuery('.webform-component--registration--Q15365-A24663').fadeOut();
        //******************
        jQuery('.webform-component--savings-contact-information').fadeOut();
        jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeOut();
    });


    //*********************************** Are you currently taking PRISTIQ? no ************************************************************//
    jQuery('#edit-submitted-registration-q14024-a21043-2').click(function() {
        jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').fadeOut();

        jQuery('.webform-component--registration--Q15668-A25512').fadeIn();

        jQuery('.webform-component--registration--options-eligibility-text').fadeOut();
        jQuery('.webform-component--registration--Q15365-A24663').fadeOut();
        //******************
        jQuery('.webform-component--savings-contact-information').fadeOut();
        jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeOut();
    });


    //*************************** Are you currently taking PRISTIQ? no but **********************************************//
    jQuery('#edit-submitted-registration-q14024-a21043-3').click(function() {
        if (jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked')) {

            jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').fadeOut();
            jQuery('.webform-component--registration--Q15668-A25512').fadeOut();

            jQuery('.webform-component--registration--options-eligibility-text').fadeIn();
            jQuery('.webform-component--registration--Q15365-A24663').fadeIn();

        } else {

            jQuery('.webform-component--savings-contact-information').fadeIn();
            jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeIn();

            jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').fadeOut();
            jQuery('.webform-component--registration--Q15668-A25512').fadeOut();

            jQuery('#progressbar2').fadeOut(function() {
                jQuery('#progressbar3').fadeIn();
            });

        }
    });


    //********************************** How long have you been taking PRISTIQ? ********************************//
    jQuery("input[name='submitted[registration][how_long_have_you_been_taking_pristiq]']").click(function() {

        if (jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked')) {

            jQuery('.webform-component--registration--options-eligibility-text').fadeIn();
            jQuery('.webform-component--registration--Q15365-A24663').fadeIn();

        } else {
            jQuery('.webform-component--savings-contact-information').fadeIn();
            jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeIn();

            jQuery('#progressbar2').fadeOut(function() {
                jQuery('#progressbar3').fadeIn();
            });

        }
    });


    //********************************** Which of the following statements best describes you?  ****************//
    jQuery("input[name='submitted[registration][Q15668_A25512]']").click(function() {
        if (jQuery('#edit-submitted-select-one-or-both-q15667-a25508-1').is(':checked')) {

            jQuery('.webform-component--registration--options-eligibility-text').fadeIn();
            jQuery('.webform-component--registration--Q15365-A24663').fadeIn();

        } else {

            jQuery('.webform-component--savings-contact-information').fadeIn();
            jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeIn();

            jQuery('#progressbar2').fadeOut(function() {
                jQuery('#progressbar3').fadeIn();
            });
        }
    });




    jQuery('#edit-submitted-registration-q15365-a24663-2').click(function() {
        jQuery('.webform-component--savings-contact-information').fadeIn();
        jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeIn();

        jQuery('.webform-component--registration--eligibility-error').fadeOut();

        jQuery('#progressbar2').fadeOut(function() {
            jQuery('#progressbar3').fadeIn();
        });

    });

    jQuery('#edit-submitted-registration-q15365-a24663-1').click(function() {
        jQuery('.webform-component--savings-contact-information').fadeOut();
        jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeOut();

        if (jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').attr('style') === 'display: block;') {
            jQuery('.webform-component--registration--eligibility-error').attr('style', 'top: 460px;');
        }
        if (jQuery('.webform-component--registration--Q15668-A25512').attr('style') === 'display: block;') {
            jQuery('.webform-component--registration--eligibility-error').attr('style', 'top: 607px;');
        }
        if (jQuery('#edit-submitted-registration-q14024-a21043-3').is(':checked')) {
            jQuery('.webform-component--registration--eligibility-error').attr('style', 'top: 388px;');
        }
        jQuery('.webform-component--registration--eligibility-error').fadeIn();
        jQuery('#progressbar3').fadeOut();
        jQuery('#progressbar2').fadeIn();
    });


    //*************************** progess bar  ************************//
    jQuery("input[name='submitted[registration][Q13923_A20681]']").click(function() {
        jQuery('#progressbar1').fadeOut(function() {
            jQuery('#progressbar2').fadeIn();
        });
    });

    jQuery('#Q15365|A24664').click(function() {
        jQuery('#progressbar2').fadeOut(function() {
            jQuery('#progressbar3').fadeIn();
        });
    });

    jQuery('#Q15365|A24663').click(function() {
        jQuery('#progressbar3').fadeOut(function() {
            jQuery('#progressbar2').fadeIn();
        });
    });


});



function close_all() {
    jQuery('.webform-component--registration--Q14024-A21043').fadeOut();

    jQuery('.webform-component--registration--how-long-have-you-been-taking-pristiq').fadeOut();

    jQuery('.webform-component--registration--Q15668-A25512').fadeOut();

    jQuery('.webform-component--registration--options-eligibility-text').fadeOut();
    jQuery('.webform-component--registration--Q15365-A24663').fadeOut();

    jQuery('.webform-component--savings-contact-information').fadeOut();
    jQuery('#webform-client-form-48.webform-client-form div div.form-actions').fadeOut();

    jQuery('.webform-component--registration--eligibility-error').fadeOut();

    jQuery('#progressbar3').fadeOut();
    jQuery('#progressbar2').fadeOut();
    jQuery('#progressbar1').fadeIn();


}
