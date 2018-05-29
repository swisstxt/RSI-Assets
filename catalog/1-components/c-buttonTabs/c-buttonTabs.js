// ============================================
// Button Tabs change select
// ============================================

// Libraries
// ============================================

var $ = require('jquery');
global.jQuery = global.$ = $;


// Class
// ============================================


function ButtonTabs($el) {
  var $label = $el.find('.js-label');

  $label.on('click', function() {
    $label.removeClass('is-active');
    $(this).addClass('is-active');
  });
}

module.exports = ButtonTabs;
