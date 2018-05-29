// ============================================
// Filter topic dropdown / accordion
// ============================================

// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================

function FieldSearch($el) {
	var $close = $el.find('.js-fieldSearch_btnClose');
	var $input = $el.find('.js-fieldSearch_input');

	$close.on('click', function(e) {
		$input.val('');
		$close.removeClass('is-visible');
	});

	$input.on('keyup', function(e) {		
  		$close.addClass('is-visible');
	});
}

module.exports = FieldSearch;
