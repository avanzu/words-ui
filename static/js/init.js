(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        /*
         var suspend = false;
         $('[data-material-select]').material_select();
         $('[data-material-select]').on('change', function () {
         if (!suspend) {
         suspend   = true;
         var event = new CustomEvent('change', {
         detail  : 'change',
         bubbles : true
         });
         $(this).get(0).dispatchEvent(event);
         }
         else {
         suspend = false;
         }
         });
         */

    }); // end of document ready
})(jQuery); // end of jQuery name space


