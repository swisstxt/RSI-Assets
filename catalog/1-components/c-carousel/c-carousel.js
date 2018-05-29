// ============================================
// Carousel
// ============================================


// Libraries
// ============================================

var $ = require('jquery');
require('slick-carousel');
var bpHelper = require('../../../src/js/utilities/breakpointHelper');
var c_carousel_slick;
var c_carousel_slick_data;
var booleanSlick = false;

// Class
// ============================================

function Carousel($el) {
	var $carousel = $el.find('.js-carousel');
	var $items = $el.find('.js-carousel_items');
	var $item = $el.find('.js-carousel_item');	

	if ($el.hasClass('c-carousel-unslick@xs')) {
		console.log(booleanSlick);
		if (!bpHelper.isMatching('sm')) {			
			carouselUnslick($items);
		} else {
			initSlick($el, $items, $item);
		}

		$(window).resize(function() {
			console.log(booleanSlick);
			if (!bpHelper.isMatching('sm')) {
				carouselUnslick($items);
			} else {
				initSlick($el, $items, $item);

				// Lancio la funzion per show e hide delle frecce
				if (c_carousel_slick_data.infinite == false){
					carouselStartAndFinish($el, $items, $item)
				}
			}
		});
	} else {
		initSlick($el, $items, $item);
	}

	// Controllo se il contenuto è più piccolo del contenitore
	carouselShortContent($el, $items, $item);
}

function initSlick(myEl, myItems, myItem) {
	if(!booleanSlick){
		console.log("init");
		c_carousel_slick = null;
		c_carousel_slick = myItems.slick({
			nextArrow: '<button type="button" class="c-carousel_arrow c-carousel_arrow-next js-carousel_arrow-next"><svg class="c-icon c-icon-arrow c-carousel_arrowIcon c-carousel_arrowIcon-next"><use xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite +'#angle-right"></use></svg></button>',
			prevArrow: '<button type="button" class="c-carousel_arrow c-carousel_arrow-prev js-carousel_arrow-prev"><svg class="c-icon c-icon-arrow c-carousel_arrowIcon c-carousel_arrowIcon-prev"><use xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite +'#angle-left"></use></svg></button>'
		});

		// Salvo i data dello slick in una var globale
		c_carousel_slick_data = c_carousel_slick.data('slick');

		// Lancio la funzione per show e hide delle frecce
		if (c_carousel_slick_data.infinite == false){
			if (bpHelper.isMatching('sm')) {
				carouselStartAndFinish(myEl, myItems, myItem);
			};
		}

		// Al click del bottone next
		$(myEl).on('click','.js-carousel_arrow-next', function(){
    		carouselClickButtonNext(myEl, myItems);
		});

		// Al click del bottone next
		$(myEl).on('click','.js-carousel_arrow-prev', function(){
    		carouselClickButtonPrev(myEl, myItems);
		});

		c_carousel_slick.on('afterChange', function(event, slick, currentSlide, nextSlide){
			// Lancio la funzione per show e hide delle frecce
			if (c_carousel_slick_data.infinite == false){
				if (bpHelper.isMatching('sm')) {
					carouselStartAndFinish(myEl, myItems, myItem);
				};
			}
		});		
		booleanSlick = true;
	}
	//c_carousel_slick.slick('reinit');
}

function carouselUnslick($items) {
	try {
		booleanSlick = false;
		$items.slick('unslick');
	}catch(err) {}
}

function carouselClickButtonNext(myEl, myItems) {
	var $arrowPrev = myEl.find('.js-carousel_arrow-prev');
	var $gradientLeft = myEl.find('.js-carousel_gradientCover-left');
	
	$arrowPrev.fadeIn(200);
	if (myEl.hasClass('c-carousel-lateralGradient')){$gradientLeft.fadeIn(200)};
}

function carouselClickButtonPrev(myEl, myItems) {
	var $gradientRight = myEl.find('.js-carousel_gradientCover-right');
	var $arrowNext = myEl.find('.js-carousel_arrow-next');

	$arrowNext.fadeIn(200);
	if (myEl.hasClass('c-carousel-lateralGradient')){$gradientRight.fadeIn(200)};
}

function carouselStartAndFinish(myEl, myItems, myItem) {
	var $slickTrack = myEl.find('.slick-track');
	var $itemsContentWidth = myItems.width();
	var $itemsWidth = 0;
	var $arrowNext = myEl.find('.js-carousel_arrow-next');
	var $arrowPrev = myEl.find('.js-carousel_arrow-prev');
	var $gradientLeft = myEl.find('.js-carousel_gradientCover-left');
	var $gradientRight = myEl.find('.js-carousel_gradientCover-right');

	// Calcolo la larghezza di tutti gli items
	myItem.each(function(index) {
		$itemsWidth += $(this).width();
	});

	// Estraggo lo spostameno l'aterale
	var transform3d = $slickTrack.css('-webkit-transform');
	transform3d = transform3d.substring(transform3d.indexOf("(") + 1, transform3d.indexOf(")"));
	transform3d = transform3d.split(",");

	slickTrackMarginLeft = parseInt(transform3d[4]) * -1; // Spostamento laterale in px
	var slickContentLimit = $itemsWidth - $itemsContentWidth; // Limite oltre il quale rimuovere le frecce

	// Se lo slidere arriva in fondo
	if(slickContentLimit < (slickTrackMarginLeft + 5)) {
		$arrowNext.fadeOut(100);
		$gradientRight.fadeOut(100);
	} else {
		$arrowNext.fadeIn(200);
		if (myEl.hasClass('c-carousel-lateralGradient')){$gradientRight.fadeIn(200)};
	}

	// Se lo slidere è all'inizio
	if(slickTrackMarginLeft <= 0) {
		$arrowPrev.fadeOut(100);
		$gradientLeft.fadeOut(100);
	} else {
		$arrowPrev.fadeIn(200);
		if (myEl.hasClass('c-carousel-lateralGradient')){$gradientLeft.fadeIn(200)};
	}
}

function carouselShortContent(myEl, myItems, myItem) {
	var $slickTrack = myEl.find('.slick-track');
	var $itemsContentWidth = myItems.width();
	var $itemsWidth = 0;
	var $gradientLeft = myEl.find('.js-carousel_gradientCover-left');
	var $gradientRight = myEl.find('.js-carousel_gradientCover-right');

	// Calcolo la larghezza di tutti gli items
	myItem.each(function(index) {
		$itemsWidth += $(this).width();
	});

	// Se gli elementi non sforano lo spazio visibile
	if(($itemsContentWidth + 2) >= $itemsWidth) {
		$gradientLeft.fadeOut();
		$gradientRight.fadeOut();
	}
}

module.exports = Carousel;