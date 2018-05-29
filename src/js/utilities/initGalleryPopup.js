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
  var $html = $('.js-popup-gallery');

  // Break out if no video links present
  if ($html.length <= 0) return;

  $html.on('click', function(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    console.log($el.context.id);
    var id = $el.context.id;
    $.ajax(global.dynamicConfig.ajaxPaths.gallery + id)
    .done(function(data) {
      console.log('success ' + data);
      $.magnificPopup.open({
        items: data,
        gallery: {
          enabled: true
        },
        type: 'image',
        iframe: {
          markup: '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" wmode="transparent" allowfullscreen></iframe>' +
          '<div class="mfp-bottom-bar">' +
          '<div class="mfp-title"></div>' +
          '<div class="mfp-description"></div>' +
          '<div class="mfp-counter"></div>' +
          '</div>' +
          '</div>'
        },
        image: {
          markup: '<div class="mfp-figure">' +
          '<div class="mfp-close"></div>' +
          '<div class="mfp-img"></div>' +
          '<div class="mfp-bottom-bar">' +
          '<div class="mfp-title">Iframe</div>' +
          '<div class="mfp-description"></div>' +
          '<div class="mfp-counter"></div>' +
          '</div>' +
          '</div>'
        }
      });
    })
    .fail(function(request, error) {
      console.log('error ' + error);
    })
    .always(function() {
      console.log('complete');
    });
  });
};
