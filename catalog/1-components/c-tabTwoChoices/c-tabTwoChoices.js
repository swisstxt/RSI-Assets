// ============================================
// Tabs switch tab
// ============================================

// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================

function TabTwoChoices($el) {
  var $label = $el.find('.js-tabTwoChoices_label');
  var $content = $el.find('.js-tabTwoChoices_content');

  $label.on('click', function(e) {
    var $myContent = "#"+$(this).data('label');

    $label.removeClass('is-active');
    $(this).addClass('is-active');
    
    $content.removeClass('is-active');
    $content.hide();
    $($myContent).fadeIn();
  });
}

module.exports = TabTwoChoices;
