// ============================================
// Carousel
// ============================================


// Libraries
// ============================================

var $ = require('jquery');
require('slick-carousel');
var bpHelper = require('../../../src/js/utilities/breakpointHelper');
var c_carouselWithDetail_slick;
var c_carouselWithDetail_slickDetail;


// Class
// ============================================

function Carousel($el) {
	var $carousel = $el.find('.js-carouselWithDetail');
	var $items = $el.find('.js-carouselWithDetail_items');
	var $details = $el.find('.js-carouselWithDetail_details');
	var $singleDetail = $el.find('.js-carouselWithDetail_detail');
	var $moreBtn = $el.find('.js-carousel_btnMoreDetails');

	$moreBtn.on('click', function(e) {
		showDetailsToSmartphone($singleDetail, $moreBtn);
  	});

	if ($el.hasClass('c-carousel-unslick@xs')) {
		if (!bpHelper.isMatching('sm')) {						
			carouselUnslickWithDetail();
			hideDetailsToSmartphone($singleDetail, $moreBtn);	
		} else {
			initSlickWithDetail($el, $items, $details);
		}

		$(window).resize(function() {
			if (!bpHelper.isMatching('sm')) {
				carouselUnslickWithDetail();
				hideDetailsToSmartphone($singleDetail, $moreBtn);
			} else {
				initSlickWithDetail($el, $items, $details);
			}
		});		
	} else {
		initSlickWithDetail($el, $items, $details);
	}	
}

function initSlickWithDetail(myEl, myItems, myDetails) {
	if(!c_carouselWithDetail_slick){
		c_carouselWithDetail_slick = myItems.slick({
			asNavFor: myDetails,
			nextArrow: '<button type="button" class="c-carousel_arrow c-carousel_arrow-next js-carousel_arrow-next"><svg class="c-icon c-icon-arrow c-carousel_arrowIcon c-carousel_arrowIcon-next"><use xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite +'#angle-right"></use></svg></button>',
			prevArrow: '<button type="button" class="c-carousel_arrow c-carousel_arrow-prev js-carousel_arrow-prev"><svg class="c-icon c-icon-arrow c-carousel_arrowIcon c-carousel_arrowIcon-prev"><use xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite +'#angle-left"></use></svg></button>'
		});

		c_carouselWithDetail_slickDetail = myDetails.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: myItems
		});
	}
}

function carouselUnslickWithDetail() {
	if(c_carouselWithDetail_slick){
		c_carouselWithDetail_slick.slick('unslick');
		c_carouselWithDetail_slick = null;

		c_carouselWithDetail_slickDetail.slick('unslick');
		c_carouselWithDetail_slickDetail = null;
	}
}


function hideDetailsToSmartphone(mySingleDetail, myMoreBtn) {	
	mySingleDetail.each(function(index) {
		if(index > 2) {
			myMoreBtn.show();
			$(this).addClass('is-enable');
		}
	});
}

function showDetailsToSmartphone(mySingleDetail, myMoreBtn) {
	var hiddenCounter = 0;

	mySingleDetail.each(function(index) {
		if($(this).hasClass('is-enable')) {
			$(this).removeClass('is-enable');
			hiddenCounter++;
		}
		if(hiddenCounter == 3){
			return false;
		}
	});
	if(!mySingleDetail.last().hasClass('is-enable')){
		myMoreBtn.hide();
	}
}

module.exports = Carousel;
