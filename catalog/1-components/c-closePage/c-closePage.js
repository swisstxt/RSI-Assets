// ============================================
// Button back to top
// ============================================

// Libraries
// ============================================

var $ = require('jquery');
global.jQuery = global.$ = $;


// Class
// ============================================

function BackToTop($el) {
  var timeout = 100;
  var oldScrolling = 0;
  var newScrolling = 0;
  var delta = 80;

  var controlViewButton = function() {
    var $scrolling = $(window).scrollTop();
    newScrolling = $scrolling;
    if ($scrolling >= 550) {
      if (oldScrolling - delta > newScrolling) {
        $el.addClass('is-active');
      } else if (oldScrolling < newScrolling) {
        $el.removeClass('is-active');
      }
    } else {
      $el.removeClass('is-active');
    }
    oldScrolling = $scrolling;
    setTimeout(controlViewButton, timeout);
  };
  controlViewButton();

  $el.on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 700);
  });
}

module.exports = BackToTop;
