// ============================================
// Filter Az select buttom
// ============================================

// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================


function FilterAz($el) {
  var $btn = $el.find('.js-filterAz_link');

  $btn.on('click', function(e) {
    if (!$(this).hasClass('js-filterAz_link-disabled')) {
      $btn.removeClass('is-active');
      $(this).toggleClass('is-active');
    }
  });
}

module.exports = FilterAz;
