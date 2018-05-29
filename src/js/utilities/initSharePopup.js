// ============================================
// Share Popup
// ============================================

// This popup uses the Magnific Popup Plugin to
// display the sahring options.

// Usage example:

// <a
//   href="#"
//   class="js-popup-share"
//   data-share-url="http://url/to/be/shared/required!"
// >
//   Share popup link
// </a>


// Libraries
// ============================================

var $ = require('jquery');
require('magnific-popup');


// Share Template
// ============================================

// 1. The markup for the dialog is rendered
//    using Handlebars. This prevents having to
//    append the markup to every page, even if no
//    sharing functionality is present.

var shareTemplate = require('../templates/shareDialog.hbs'); // 1.


// Create a window popup
// ============================================

function createPopup(url) {
  var windowW = 630;
  var windowH = 450;
  var windowX = screen.width / 2 - windowW / 2;
  var windowY = screen.height / 2 - windowH / 2;
  var extra = 'status=no,menubar=no,resizable=yes,toolbar=no,scrollbars=yes,addressbar=no';
  return window.open(url, 'share', 'width=' + windowW + ',height=' + windowH + ',top=' + windowY + ',left=' + windowX + ',' + extra);
}


// Handle the social icons click
// ============================================

function handleSocialIconClick(e) {
  e.preventDefault();
  var $el = $(e.currentTarget);
  var type = $el.data('type');
  var url = encodeURIComponent($el.data('share-url'));
  var customTitle = $el.data('share-title');
  var title = customTitle.length ? customTitle : encodeURIComponent(document.title);

  switch (type) {
  case 'fb':
    createPopup('https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title);
    break;
  case 'tw':
    createPopup('https://twitter.com/intent/tweet?url=' + url + '&text=' + title);
    break;
  default:
    createPopup($el.attr('href'));
    break;
  }
}


// Handle the sharing click & initiliaze Mfp
// ============================================

function handleShareIconClick(e) {
  e.preventDefault();
  var shareUrl = $(e.currentTarget).data('share-url');
  var shareTitle = $(e.currentTarget).data('share-title');
  var svgSprite = global.dynamicConfig.ajaxPaths.svgSprite;

  $.magnificPopup.open({
    autoFocusLast: false,
    removalDelay: 200,
    mainClass: 'mfp-fade mfp-has-dialog',
    closeBtnInside: false,
    items: {
      type: 'inline',
      src: shareTemplate({
        shareUrl: shareUrl,
        shareTitle: shareTitle,
        svgSprite: svgSprite
      })
    }
  });
}


// Export
// ============================================

module.exports = function() {
  var $shareTriggers = $('.js-popup-share');
  // Break out if no share links present
  if ($shareTriggers.length <= 0) return;

  // $shareTriggers.on('click', handleShareIconClick);
  $(document).on('click', '.js-popup-share', handleShareIconClick);
  $(document).on('click', '.js-share', handleSocialIconClick);
};
