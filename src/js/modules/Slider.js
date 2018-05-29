// ============================================
// Slider
// ============================================

// Slider that uses native scrolling (`overflow: auto`).
// It is heavily dependent on CSS, see: sass/widgets/_c-slider.sass
// It uses a very lightweight scroll event listener and
// `requestAnimationFrame` to create a very performant scroll callback.
//
// It also makes use of the breakpoint helper module
// (see: `js/utilities/breakpointHelper.js`) to activate
// the slider only on tabled and onward.
//
// It works well the way it is but it could probably
// be made more flexible with.


// Libraries
// ============================================

var $ = require('jquery');
global.jQuery = global.$ = $;
var bpHelper = require('./../utilities/breakpointHelper');
require('slick-carousel');


// Class
// ============================================

function Slider($el) {
  this.$el = $el;
  this.cacheDom();

  this.lastKnownScroll = 0;
  this.isTicking = false;
  this.isAnimating = false;

  this.cssState = {
    visible: 'is-visible',
    first: 'is-onFirst',
    last: 'is-onLast'
  };

  this.scrollAmount = this.$el.data('scroll-amount') || 1;
  this.scrollAnimationSpeed = 300;
  this.dimensions = {};

  if (bpHelper.isMatching('sm')) this.init();
  bpHelper.listenMatchMin('sm', this.responsiveInitDestroy.bind(this));

  if (this.$el.hasClass('c-slider-hoverMagnify')) this.hoverMagnify($el);
  if (this.$el.hasClass('c-slider-reducedList@xs')) this.showHiddenItem($el);

  // Convert slider to slicker
  var $elInner = this.$el.find('.js-slider_inner');
  if ($elInner.hasClass('js-slider-slickCarousel')) {
    convertToSlicker($el);

    $(window).resize(function() {
      convertToSlicker($el);
    });
  }
}


// Hover Magnify
// ============================================

Slider.prototype.hoverMagnify = function(e) {
  var $el = e;

  var $item = $el.find('.js-slider_item');

  $item.on('mouseover', function() {
    $item.addClass('is-disabled');
    $(this).removeClass('is-disabled');
  });

  $item.on('mouseout', function() {
    $item.removeClass('is-disabled');
  });
};


// Show hidden item
// ============================================

Slider.prototype.showHiddenItem = function(e) {
  var $el = e;
  var $btm = $el.find('.js-slider_btnShowMore');

  $btm.on('click', function() {
    $el.addClass('is-allItemVisible');
  });
};


// Convert slider to slicker
// ============================================

function convertToSlicker(el) {
  var $el = el;
  var $slickCarousel = el.find('.js-slider-slickCarousel');
  var $slickList = el.find('.slick-list');
  var $item = el.find('.js-slider_item');

  var $widthVariable = true;
  var $dotsVisible = false;

  // Determina se l'item ha la larghezza fissa o si adatta
  if ($el.hasClass('js-slider-slickFullWidth')) {
    $widthVariable = false;
  }

  // Determina se sono presenti i pallini
  if ($el.hasClass('js-slider-slickDots')) {
    $dotsVisible = true;
  }

  if (!bpHelper.isMatching('sm')) {
    if (!$slickCarousel.hasClass('slick-initialized')) {
      var $firstItemVisible = 0;

      $item.each(function(i) {
        if ($(this).hasClass('js-slider-firstItem')) {
          $firstItemVisible = i;
        }
      });

      $slickCarousel.slick({
        dots: $dotsVisible,
        arrows: false,
        mobileFirst: true,
        infinite: false,
        centerPadding: '0px',
        speed: 500,
        centerMode: true,
        variableWidth: $widthVariable,
        initialSlide: $firstItemVisible
      });
    }
  } else {
    if ($slickCarousel.hasClass('slick-initialized')) {
      $slickCarousel.removeClass('slick-initialized slick-slider');

      $item.each(function() {
        $(this).removeClass( 'slick-slide slick-current slick-active slick-center');
        $(this).attr('style', '');
        $(this).appendTo($slickCarousel);
      });

      $slickCarousel.slick('removeSlide', null, null, true);
      $slickList.remove();
    }
  }
}


// Responsive Init
// ============================================

Slider.prototype.responsiveInitDestroy = function(shouldInit) {
  if (shouldInit) {
    this.init();
  } else {
    this.destroy();
  }
};


// Init
// ============================================

Slider.prototype.init = function() {
  this.updateState();
  this.$dom.scroller.on('scroll.slider', $.proxy(this.handlerScroll, this));
  this.$dom.controls.on('click.slider', $.proxy(this.handlerClick, this));
  this.$dom.win.on('resize.slider', $.proxy(this.updateState, this));

  var $elLive = this.$el.find('.js-slider-firstItem');
  if ( $elLive.size() > 0 ) {
    if ( $elLive.index() > 0 ) {
      this.dimensions.initPositionLive = $elLive.index() - 1;
      this.initSliderLive();
    }
  }
};


// Destroy
// ============================================

Slider.prototype.destroy = function() {
  this.$dom.scroller.off('scroll.slider');
  this.$dom.controls.off('click.slider');
  this.$dom.win.off('resize.slider');
};


// Helper to cache all necessary DOM elements
// ============================================

Slider.prototype.cacheDom = function() {
  this.$dom = {
    el: this.$el,
    scroller: this.$el.find('.js-slider_scroller'),
    inner: this.$el.find('.js-slider_inner'),
    controls: this.$el.find('.js-slider_control'),
    items: this.$el.find('.js-slider_item'),
    win: $(window)
  };

  this.$dom.controlPrev = this.$dom.controls.filter(function() {
    return $(this).data('direction') === 'prev';
  });

  this.$dom.controlNext = this.$dom.controls.filter(function() {
    return $(this).data('direction') === 'next';
  });
};


// Calculate all dimensions
// ============================================

Slider.prototype.computeDimensions = function() {
  this.dimensions.itemWidth = this.$dom.items.first().outerWidth(true);
  this.dimensions.scrollAnimationAmount = this.dimensions.itemWidth * this.scrollAmount;
  this.dimensions.viewportWidth = this.$dom.scroller.outerWidth(true);
  this.dimensions.innerWidth = this.$dom.inner.innerWidth();
};

Slider.prototype.updateState = function() {
  this.computeDimensions();
  this.updateScroll();

  if (this.dimensions.innerWidth > this.dimensions.viewportWidth) {
    this.$dom.controls.addClass(this.cssState.visible);
  } else {
    this.$dom.controls.removeClass(this.cssState.visible);
  }
};


// Arrow click event handler
// ============================================

Slider.prototype.handlerClick = function(e) {
  e.preventDefault();

  var $el = $(e.currentTarget);
  var currentScroll = this.$dom.scroller.scrollLeft();
  var scrollAmount = 0;
  var self = this;

  if ($el.attr('disabled') || this.isAnimating) return;

  this.isAnimating = true;

  if ($el.data('direction') === 'next') {
    scrollAmount = currentScroll + this.dimensions.scrollAnimationAmount;
  } else {
    scrollAmount = currentScroll - this.dimensions.scrollAnimationAmount;
  }

  this.$dom.scroller.animate({
    scrollLeft: scrollAmount
  }, this.scrollAnimationSpeed, function() {
    self.isAnimating = false;
  });
};

// Init slider live
// ============================================

Slider.prototype.initSliderLive = function() {
  var currentScroll = this.$dom.scroller.scrollLeft();
  var scrollAmount = 0;
  var self = this;

  this.isAnimating = true;


  scrollAmount = currentScroll + (this.dimensions.scrollAnimationAmount * this.dimensions.initPositionLive);
  this.dimensions.initPositionLive = 1;


  this.$dom.scroller.animate({
    scrollLeft: scrollAmount,
    duration: 0
  }, this.scrollAnimationSpeed, function() {
    self.isAnimating = false;
  });
};


// Slider scroll event handler
// ============================================

Slider.prototype.handlerScroll = function() {
  this.lastKnownScroll = this.$dom.scroller.scrollLeft();
  this.requestTick();
};

// Request on rAF
// ============================================

Slider.prototype.requestTick = function() {
  if (!this.isTicking) {
    window.requestAnimationFrame(this.updateScroll.bind(this));
  }
};


// Scroll callback
// ============================================

Slider.prototype.updateScroll = function() {
  this.isTicking = false;
  var currentScroll = this.lastKnownScroll;

  if (currentScroll + this.dimensions.viewportWidth >= this.dimensions.innerWidth) {
    this.$dom.controlNext.attr('disabled', true);
    this.$dom.el.addClass(this.cssState.last);
  } else {
    this.$dom.controlNext.removeAttr('disabled', false);
    this.$dom.el.removeClass(this.cssState.last);
  }

  if (currentScroll <= 0) {
    this.$dom.controlPrev.attr('disabled', true);
    this.$dom.el.addClass(this.cssState.first);
  } else {
    this.$dom.controlPrev.removeAttr('disabled', false);
    this.$dom.el.removeClass(this.cssState.first);
  }
};


module.exports = Slider;
