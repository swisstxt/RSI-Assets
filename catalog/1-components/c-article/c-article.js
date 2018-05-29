// ============================================
// c-article
// ============================================

// Libraries
// ============================================

var $ = require('jquery');
var $stickyKit = require('sticky-kit/dist/sticky-kit.js');
var cookieJquery = require('jquery.cookie');

// Class
// ============================================

function Article($el) {
	var $smallerFont =	$el.find('.js-article_option_smallerFont');
	var $biggerFont = 	$el.find('.js-article_option_biggerFont');
	var $fontSize = 0;

	var cFontSize = $.cookie('fontSize');
	if(cFontSize != undefined){
		var $fontSize = cFontSize;
		controlFontSize($el, cFontSize);
	}

	$smallerFont.on('click', function(e) {
		if($fontSize > -1) {
			$fontSize--;
			$.cookie('fontSize',$fontSize,{path: '/'});
			controlFontSize($el, $fontSize);
		}
	});

	$biggerFont.on('click', function(e) {
		if($fontSize < 1) {
			$fontSize++;
			$.cookie('fontSize',$fontSize,{path: '/'});
			controlFontSize($el, $fontSize);
		}
	});
	$('[data-sticky_column]').stick_in_parent({
		parent: '[data-sticky_parent]'
	});
}


// Function control size font
// ============================================

function controlFontSize(el, fontSize) {
	var $smallerFont =	el.find('.js-article_option_smallerFont');
	var $biggerFont = 	el.find('.js-article_option_biggerFont');

	if(fontSize == 0) {
		$smallerFont.removeClass('is-active');
		$biggerFont.removeClass('is-active');

		el.removeClass('js-article-smallerFont');
		el.removeClass('js-article-biggerFont');
	};

	if(fontSize == -1) {
		$smallerFont.addClass('is-active');
		$biggerFont.removeClass('is-active');

		el.addClass('js-article-smallerFont');
	};

	if(fontSize == 1) {
		$biggerFont.addClass('is-active');
		$smallerFont.removeClass('is-active');

		el.addClass('js-article-biggerFont');
	};
};

module.exports = Article;
