// ============================================
// Dropdown filter (filter topic alike)
// ============================================

// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================

function FilteredListWithText($el) {
  var $btn = $el.find('.js-filteredListWithText_btn');
  var $list = $el.find('.js-filteredListWithText_listWrap');
  var $item = $el.find('.js-filteredListWithText_listItem');
  var $title = $el.find('.js-filteredListWithText_title');

  $btn.on('click', function(e) {
    $el.toggleClass('is-visible');
  });

  $(document).click(function(e) {
    var target = e.target;

    if (!$(target).is($btn) && !$(target).parents().is($btn) && !$(target).is($item) && !$(target).parents().is($item)) {
      $el.removeClass('is-visible');
    }
  });

  $('.js-filteredListWithText_list').on('click', 'li', function(e) {
    $el.toggleClass('is-visible');
    $item.removeClass('is-active');
    $(this).addClass('is-active');
    $title.text($(this).text());
  });
}

module.exports = FilteredListWithText;
