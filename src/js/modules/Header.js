// ============================================
// Header
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

function Header($el) {
  this.$el = $el;

  this.$dom = {
    el: this.$el,
    toggler: this.$el.find('.js-header_toggler'),
    nav: this.$el.find('.js-header_nav'),
    subTogglers: this.$el.find('.js-header_subToggler'),
    subLists: this.$el.find('.js-header_subList'),
    searchToggler: this.$el.find('.js-header_searchToggler'),
    searchForm: this.$el.find('.js-header_searchForm'),
    searchInput: this.$el.find('.js-header_searchInput'),
    openMoreItems: this.$el.find('.js-header_secondaryNavLink-moreItems'),
    hiddenMenu: this.$el.find('.js-header_secondaryNavList_hiddenLink'),
    doc: $(document)
  };

  this.cssState = {
    open: 'is-open'
  };

  this.$dom.toggler.on('click', this.handleTogglerClick.bind(this));
  this.$dom.subTogglers.on('click', this.handleSubTogglerClick.bind(this));
  this.$dom.searchToggler.on('click', this.handleSearchTogglerClick.bind(this));
  this.$dom.doc.on('click', this.handleDocClick.bind(this));
  this.$dom.searchForm.on('click', this.handleDocClickPrevention.bind(this));
  this.$dom.openMoreItems.on('click', this.openHiddenMenu.bind(this));

  changeLogo($el);
}


// Handle Toggler click
// ============================================

Header.prototype.handleTogglerClick = function(e) {
  e.preventDefault();

  // Close search in case it is open
  this.$dom.searchForm.removeClass(this.cssState.open);

  if (this.$dom.el.hasClass(this.cssState.open)) {
    this.$dom.el.removeClass(this.cssState.open);
  } else {
    this.$dom.el.addClass(this.cssState.open);
  }
};


// Handle Sub Toggler click
// ============================================

Header.prototype.handleSubTogglerClick = function(e) {
  e.preventDefault();

  var $el = $(e.currentTarget);
  var $target = $('#' + $el.data('target'));

  if ($el.hasClass(this.cssState.open)) {
    $el.removeClass(this.cssState.open);
    $target.removeClass(this.cssState.open);
  } else {
    $el.addClass(this.cssState.open);
    $target.addClass(this.cssState.open);
  }
};


// Handle search toggler click
// ============================================

Header.prototype.handleSearchTogglerClick = function(e) {
  e.preventDefault();
  e.stopPropagation();

  // Close main nav in case it is open
  this.$dom.el.removeClass(this.cssState.open);

  if (this.$dom.searchForm.hasClass(this.cssState.open)) {
    this.$dom.searchForm.removeClass(this.cssState.open);
  } else {
    var self = this;
    this.$dom.searchForm.addClass(this.cssState.open).on('transitionend', function() {
      self.$dom.searchInput.focus();
    });
  }
};

Header.prototype.handleDocClick = function() {
  this.$dom.searchForm.removeClass(this.cssState.open);
};

Header.prototype.handleDocClickPrevention = function(e) {
  e.stopPropagation();
};


// Open hidden menu
// ============================================

Header.prototype.openHiddenMenu = function() {
  if (this.$dom.hiddenMenu.hasClass('is-open')) {
    this.$dom.openMoreItems.removeClass('is-active');
    this.$dom.hiddenMenu.removeClass('is-open');
    this.$dom.el.removeClass('js-header-hiddenMenuIsOpen');
  } else {
    this.$dom.openMoreItems.addClass('is-active');
    this.$dom.hiddenMenu.addClass('is-open');
    this.$dom.el.addClass('js-header-hiddenMenuIsOpen');
  }
};


// Change logo to scroll
// ============================================

function changeLogo(e) {
  var $el = e;
  var timeout = 100;

  var controlScrollPage = function() {
    var $scrolling = $(window).scrollTop();

    if ($el.hasClass('is-open')) {
      $el.addClass('is-compact');
    } else {
      if ($scrolling > 50) {
        $el.addClass('is-compact');
      } else {
        $el.removeClass('is-compact');
      }
    }

    setTimeout(controlScrollPage, timeout);
  };
  controlScrollPage();
}


module.exports = Header;
