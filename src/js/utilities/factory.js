// ============================================
// Factory
// ============================================

// Generic factory function to create class
// instances. If no element matching the selector
// parameter, is found no instances will be created.

var $ = require('jquery');

module.exports = function(Fn, selector) {
  var $selector = $(selector);
  if ($selector.length) {
    $selector.each(function() {
      return new Fn($(this));
    });
  }
};
