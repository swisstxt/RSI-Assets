// ============================================
// Breakpoint helper
// ============================================

// Helper function to access the breakpoints (bps) defined
// in CSS. It uses the `font-family` CSS property
// of a meta tag (`.js-breakpoints`) to read out, parse,
// and generate an object containing the breakpoints.

// The breakpoint names and values are defined in
// the `sass/base/_vars.sass` Sass file.


// Libraries
// ============================================

var $ = require('jquery');


// Class
// ============================================

function BreakpointHelper() {
  this.$el = $('.js-breakpoints');
  var fontFamily = this.$el.css('font-family');

  // Break out if the element does not exist.
  if (this.$el.length <= 0 || fontFamily.length <= 0) return;

  fontFamily = fontFamily.replace(/'|"/g, '').split('&');

  this.breakpoints = fontFamily.reduce(function(prevVal, elem) {
    var el = elem.split('=');
    prevVal[el[0]] = el[1];
    return prevVal;
  }, {});
}


// Get the value of a bp by its name.
// ============================================

BreakpointHelper.prototype.getBreakpoint = function(breakpoint, minMax) {
  var type = minMax;

  if (typeof type === 'undefined') {
    type = 'min';
  }

  var value = this.breakpoints[breakpoint];

  if (type === 'max') {
    value = (parseFloat(value) - 0.0625) + 'em';
  }

  return '(' + type + '-width: ' + value + ')';
};


// Know if a bp is currently active
// ============================================

BreakpointHelper.prototype.isMatching = function(breakpoint, minMax) {
  var type = minMax;
  if (typeof type === 'undefined') {
    type = 'min';
  }

  return window.matchMedia(
    this.getBreakpoint(breakpoint, type)
  ).matches;
};


// Attach listeners to certain breakpoints
// ============================================

BreakpointHelper.prototype.listenMatchMin = function(breakpoint, callback) {
  return window.matchMedia(
    this.getBreakpoint(breakpoint, 'min')
  ).addListener(function() {
    return callback(this.matches);
  });
};

BreakpointHelper.prototype.listenMatchMax = function(breakpoint, callback) {
  return window.matchMedia(
    this.getBreakpoint(breakpoint, 'max')
  ).addListener(function() {
    return callback(this.matches);
  });
};

module.exports = new BreakpointHelper();
