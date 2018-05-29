// ============================================
// Main
// ============================================

// Main File that acts as an entry point for all JS modules.

// Libraries
// ============================================

var $ = require('jquery');
global.jQuery = global.$ = $; // used for others libraries / plugins. Add plugins only after this
var Velocity = require('velocity-animate');
var svg4everybody = require('svg4everybody');
var touchJquery = require('jquery.touch'); // Riferita alla voce dentro sezione browser del file package.json https://github.com/ajlkn/jquery.touch
var Accordion = require('accordion'); // Accordion plugin
var dynamicConfig = require('../json/dynamic_config.json');
global.dynamicConfig = dynamicConfig;

// Custom modules
// ============================================

// Non mettere mai parti di percorsi su variabili separate, dato che Browserify quando crea il pacchetto javascript
// non riesce a convertire il percorso e da errore
var factory = require('./utilities/factory');
var initSharePopup = require('./utilities/initSharePopup');
var initVideoPopup = require('./utilities/initVideoPopup');
var initHtmlPopup = require('./utilities/initHtmlPopup');
var initGalleryPopup = require('./utilities/initGalleryPopup');
var Slider = require('./modules/Slider');
var Header = require('./modules/Header');
var Footer = require('./modules/Footer');
var FilteredListWithText = require('../../catalog/1-components/c-filteredListWithText/c-filteredListWithText');
var FilterTopic = require('../../catalog/1-components/c-filterTopic/c-filterTopic');
var FilterAz = require('../../catalog/1-components/c-filterAz/c-filterAz');
var FieldSearch = require('../../catalog/1-components/c-fieldSearch/c-fieldSearch');
var SearchAZ = require('../../catalog/3-pages/programmi_az/programmi_az');
var BackToTop = require('../../catalog/1-components/c-backToTop/c-backToTop');
var ButtonTabs = require('../../catalog/1-components/c-buttonTabs/c-buttonTabs');
var TabTwoChoices = require('../../catalog/1-components/c-tabTwoChoices/c-tabTwoChoices');
var TeasersGallery = require('../../catalog/1-components/c-teasersGallery/c-teasersGallery');
var LiveTicker = require('../../catalog/1-components/c-liveTicker/c-liveTicker');
var Article = require('../../catalog/1-components/c-article/c-article');
var Carousel = require('../../catalog/1-components/c-carousel/c-carousel');
var CarouselWithDetail = require('../../catalog/1-components/c-carouselWithDetail/c-carouselWithDetail');
var AccordionComponent = require('../../catalog/1-components/c-accordionArticle/c-accordionArticle');

// Enable inline svgs in IE
svg4everybody();


// Dom ready
// ============================================

$(function() {
  /* window.isProduction */
  console.log(window.dynamicConfig);
  initSharePopup();
  initVideoPopup();
  initHtmlPopup();
  initGalleryPopup();

  // Use factory function to initialize the slider.
  factory(Slider, '.js-slider');
  factory(Header, '.js-header');
  factory(Footer, '.footer-top');
  factory(FilteredListWithText, '.js-filteredListWithText');
  factory(FilterTopic, '.js-filterTopic');
  factory(FieldSearch, '.js-fieldSearch');
  factory(FilterAz, '.js-filterAz');
  factory(BackToTop, '.js-backToTop');
  factory(ButtonTabs, '.js-buttonTabs');
  factory(TabTwoChoices, '.js-tabTwoChoices');
  factory(TeasersGallery, '.js-teasersGallery');
  factory(Article, '.js-article');
  factory(Carousel, '.js-carousel');
  factory(CarouselWithDetail, '.js-carouselWithDetail');
  factory(AccordionComponent, '.js-accordion');
  factory(SearchAZ, '#js-azSearch');
  factory(LiveTicker, '#js-liveTicker');


  // console.dir(Footer);

  // Temporary rule. REMOVE LATER !!!!!!!!!!!!!!!!!
  /*
  $('[href="#"]')
    .not('.js-popup-share')
    .on('click', function(e) {
      e.preventDefault();
      console.warn('Link default behavior is prevented via JavaScript for demo purposes. Remove before deploying to production!!!!!!!!');
    });
    */
});
