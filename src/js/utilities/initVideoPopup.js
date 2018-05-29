// ============================================
// Video Popup
// ============================================

// This popup uses the Magnific Popup Plugin to
// display the video iframes.

// Usage example:

// <a
//   href="http://url/to/video-iframe"
//   class="js-popup-video"
//   data-title="Video title (optional)"
//   data-description="Video description (optional)"
// >
//   Video popup link
// </a>

// Libraries
// ============================================

var $ = require('jquery');
require('magnific-popup');


// Iframe Template
// ============================================

// 1. The markup for the dialog is rendered
//    using Handlebars. This allows to add a custom
//    title and description to the popup.

var iframeTemplate = require('../templates/mfpIframeMarkup.hbs'); // 1.

var load = require('little-loader');


// Init Magnific Poup
// ============================================

module.exports = function() {
  var $video = $('.js-popup-video');

  // Break out if no video links present
  if ($video.length <= 0) return;

  $('body').on('click', '.js-popup-video', function(e) {
    e.preventDefault();

    $(this).magnificPopup({
      type: 'iframe',
      autoFocusLast: false,
      mainClass: 'mfp-fade',
      title: 'hey',
      titleSrc: 'data-title',
      removalDelay: 200,
      iframe: {
        markup: iframeTemplate()
      },
      callbacks: {
        markupParse: function(template, values, item) {
          values.title = item.el.data('title');
          values.desc = item.el.data('description');
          load('https://tp.srgssr.ch/assets/javascripts/player-api.min.js', function() {
            var player = this.SRG.PlayerManager.getPlayer($('#videoPlayerIframe'));
            player.hasSegments(function(hasSegments) {
              if (hasSegments) {
                $('#videoPlayerIframe').parent().css('padding-top', '72%');
              }
            });
          });
        }
      }
    }).magnificPopup('open');
  });
};
