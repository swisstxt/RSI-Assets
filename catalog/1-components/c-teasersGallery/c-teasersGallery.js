// ============================================
// Teaser gallery
// ============================================


// Libraries
// ============================================

var $ = require('jquery');
require('slick-carousel');
var bpHelper = require('../../../src/js/utilities/breakpointHelper');


// Class
// ============================================

function TeasersGallery($el) {
	setSlickCarousel($el);

	$(window).resize(function() {
		setSlickCarousel($el);
	});
};

function setSlickCarousel(el) {
	var $bigItem = el.find('.js-teasersGallery-contentBigItem');
	var $items = el.find('.js-teasersGallery-contentItems');
	var $item = el.find('.js-teasersGallery_item');
	var $slickCarousel = el.find('.js-teasersGallery-slickCarousel');

	if (bpHelper.isMatching('sm')) {
		if ($slickCarousel.html() != null && $slickCarousel.html().length > 0) {
			$item.each(function(i) {
				$(this).removeClass('slick-slide slick-current slick-active');
				$(this).attr('style', '');

				if(i == 0) {
			  		$(this).appendTo($bigItem);
			  	} else {
			  		$(this).appendTo($items);
			  	}
			});
			$slickCarousel.slick('removeSlide', null, null, true);
			$slickCarousel.empty();

		}
	} else {
		if ($slickCarousel.html() != null && $slickCarousel.html().length == 0) {
			$slickCarousel.removeClass('slick-initialized slick-slider slick-dotted')
			$item.each(function(i) {
			  $(this).appendTo($slickCarousel);
			})

			$slickCarousel.slick({
				dots: true,
				arrows: false,
				mobileFirst: true,
				infinite: false,
				centerPadding: '0px',
				speed: 500
			});
		}
	}	
}


module.exports = TeasersGallery;