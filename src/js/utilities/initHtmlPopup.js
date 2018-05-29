// ============================================
// Html Popup
// ============================================


// Libraries
// ============================================

var $ = require('jquery');
require('magnific-popup');


// Init Magnific Poup
// ============================================

module.exports = function() {
  var $html = $('.js-popup-html');

  // Break out if no video links present
  if ($html.length <= 0) return;

  $html.magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    callbacks: {
      open: function() {
        var magnificPopup = $.magnificPopup.instance;
        var cur = magnificPopup.st.el;

        var idModal = cur.attr('href').trim();
        var title = cur.text().trim();
        var data = cur.parent().parent().find('.c-teaserSmall_desc').text().trim();
        var description = cur.parent().parent().find('.c-teaserSmall_description_hidden').text().trim();
        $(idModal).find('.c-articleSkinny_title').html(title);
        $(idModal).find('.c-articleSkinny_date').html(data);
        $(idModal).find('.c-articleSkinny_content').html(description);
      }
    }
  });
};
