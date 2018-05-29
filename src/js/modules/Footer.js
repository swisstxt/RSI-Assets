// ============================================
// Footer
// ============================================

// This is realy a singleton but for the sake
// of structure it makes sense to create a
// class for it.

// Libraries
// ============================================

var $ = require('jquery');
global.jQuery = global.$ = $;


// Class
// ============================================

function Footer($el) {
  this.$el = $el;

  this.$dom = {
    el: this.$el,
    toggler: this.$el.find('.accordion-toggle')
  };

  this.$dom.toggler.on('click', this.handleTogglerClick.bind(this));
}


// Handle Toggler click
// ============================================

Footer.prototype.handleTogglerClick = function(e) {
  e.stopPropagation();
  e.preventDefault();
  var $el = $(e.currentTarget);
  var idCollapse = $el.attr('href');
  $(idCollapse).slideToggle();
};


module.exports = Footer;
