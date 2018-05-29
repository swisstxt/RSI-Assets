// ============================================
// Accordion
// ============================================

// Libraries
// ============================================

var $ = require('jquery');
require('accordion');

global.jQuery = global.$ = $;


// Class
// ============================================

function AccordionComponent($el) {
  var el = document.querySelector(".js-accordion");
  new Accordion(el)
}

module.exports = AccordionComponent;
