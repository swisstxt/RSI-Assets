// ============================================
// c-liveTicker
// ============================================

// Libraries
// ============================================

var $ = require('jquery');
var $stickyKit = require('sticky-kit/dist/sticky-kit.js');


// Class
// ============================================

function LiveTicker($el) {
  var $overviewLink = $el.find('.js-liveTicker_overview');
  $overviewLink.on('click', function(e) {
    e.preventDefault();
    var link = $(this).attr('href');
    if (link) {
      $(link).velocity('scroll');
    }
  });

  var $mobileLink = $el.find('.js-liveTicker-mobileFilter');
  var $timeline = $el.find('.js-liveTicker-timeline');
  $mobileLink.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $timeline.removeClass('has-milestone-filter');
      var items = $timeline.find('.c-liveTicker_timeframe:not(.c-liveTicker_timeframe--milestone)');
      items.velocity('finish').velocity('slideDown');
    } else {
      $this.addClass('active');
      $timeline.addClass('has-milestone-filter');
      var items = $timeline.find('.c-liveTicker_timeframe:not(.c-liveTicker_timeframe--milestone)');
      items.velocity('finish').velocity('slideUp');
    }
  });

  $( document ).ready(function() {
    $('[data-sticky_column]').stick_in_parent({
      parent: '[data-sticky_parent]'
    });
    $(document.body).trigger("sticky_kit:recalc");
  });

}

module.exports = LiveTicker;
