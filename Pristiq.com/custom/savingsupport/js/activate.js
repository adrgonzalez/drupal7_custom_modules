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
// ?>
// JavaScript should be made compatible with libraries other than jQuery by
jQuery(document).ready(function() {

    var yearsOld = false;
    var displayPlease = false;

    if (jQuery('.messages--error').length) {
        jQuery('.messages--error').hide();
        jQuery('.webform-component--text-box1 p').append('<span class="active-saving-cart-message-errors">' + jQuery('.messages--error').html() + '</span>');
    }

    //*************************** progess bar  ************************//
    
    jQuery("#edit-submitted-q13923-a20681-1").click(function() {
        if(jQuery('#edit-submitted-q15382-a24743').val().length == 11){
            jQuery('#progressbar1').fadeOut(function() {
                jQuery('#progressbar2').fadeIn();
            });
        }
    });

    jQuery("#edit-submitted-q13923-a20681-2").click(function() {
        jQuery('#progressbar2').fadeOut();
        jQuery('#progressbar3').fadeOut();
        jQuery('#progressbar1').fadeIn();

    });

    jQuery("#edit-submitted-active-text-box2-q15365-a24663-1").click(function() {
        jQuery('#progressbar3').fadeOut();
        jQuery('#progressbar2').fadeIn();
    });

    jQuery("#edit-submitted-active-text-box2-q15365-a24663-2").click(function() {
        jQuery('#progressbar2').fadeOut(function() {
            jQuery('#progressbar3').fadeIn();
        });
    });

    //*************************** show/hide options  ************************//

    jQuery('#edit-submitted-q15382-a24743').keyup(function(e) {
        if ((jQuery(this).val().length == 11) && (jQuery('#edit-submitted-q13923-a20681-1').is(':checked'))) {
            jQuery('.section-activate-savings-card .webform-component--active-text-box2').fadeIn();
            jQuery('.section-activate-savings-card .webform-component--less-than-18-years-old-message').fadeOut();
            jQuery('#progressbar1').fadeOut(function() {
                jQuery('#progressbar2').fadeIn();
            });
        }
        else {
            jQuery('.section-activate-savings-card .webform-component--less-than-18-years-old-message').fadeOut();
            jQuery('.section-activate-savings-card .webform-component--active-text-box2').fadeOut();
            jQuery('.section-activate-savings-card .webform-component--your-contact-information').fadeOut();
            jQuery('.section-activate-savings-card .webform-component--learn-more').fadeOut();
            jQuery('.section-activate-savings-card .webform-component--submit-button').fadeOut();
            jQuery('#progressbar2').fadeOut();
            jQuery('#progressbar1').fadeIn();        
	    }
    });

    // 18-years-old:  yes
    jQuery('#edit-submitted-q13923-a20681-1').click(function() {
        if ((jQuery('#edit-submitted-q15382-a24743').val().length == 11)) {
            jQuery('.section-activate-savings-card .webform-component--active-text-box2').fadeIn();
        }else {
            jQuery('.section-activate-savings-card .webform-component--active-text-box2').fadeOut();  
        }
        jQuery('.section-activate-savings-card .webform-component--less-than-18-years-old-message').fadeOut();
    });

    // 18-years-old:  no
    jQuery('#edit-submitted-q13923-a20681-2').click(function() {
        jQuery('.section-activate-savings-card .webform-component--less-than-18-years-old-message').fadeIn();
        jQuery('.section-activate-savings-card .webform-component--active-text-box2').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--your-contact-information').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--learn-more').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--submit-button').fadeOut();
    });

    // eligibility:  yes
    jQuery('#edit-submitted-active-text-box2-q15365-a24663-1').click(function() {
        jQuery('.section-activate-savings-card .webform-component--active-text-box2--drug-prescription-message').fadeIn();
        jQuery('.section-activate-savings-card .webform-component--your-contact-information').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--learn-more').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--submit-button').fadeOut();
    });

    // eligibility:  no
    jQuery('#edit-submitted-active-text-box2-q15365-a24663-2').click(function() {
        jQuery('.section-activate-savings-card .webform-component--active-text-box2--drug-prescription-message').fadeOut();
        jQuery('.section-activate-savings-card .webform-component--your-contact-information').fadeIn();
        jQuery('.section-activate-savings-card .webform-component--learn-more').fadeIn();
        jQuery('.section-activate-savings-card .webform-component--submit-button').fadeIn();
    });

});
