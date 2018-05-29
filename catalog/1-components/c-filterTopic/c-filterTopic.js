// ============================================
// Filter topic dropdown / accordion
// ============================================

// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================

function FilterTopic($el) {
  var $btn = $el.find('.js-filterTopic_btn');
  var $list = $el.find('.js-filterTopic_listWrap');
  var $item = $el.find('.js-filterTopic_listItem');
  var $title = $el.find('.js-filterTopic_title');

  $btn.on('click', function(e) {
    $list.toggleClass('is-visible');
  });

  $(document).click(function(e) {
    var target = e.target;

    if (!$(target).is($btn) && !$(target).parents().is($btn) && !$(target).is($item) && !$(target).parents().is($item)) {
      $list.removeClass('is-visible');
    }
  });

  $('.js-filterTopic_list').on('click', 'li', function(e) {
    $list.toggleClass('is-visible');
    $item.removeClass('is-active');
    $(this).addClass('is-active');
    $title.text($(this).text());
  });
}

module.exports = FilterTopic;
