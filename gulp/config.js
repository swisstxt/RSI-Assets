'use strict';

var convertToRem = require('./util/convertToRem');
var ifMultiple = require('./util/ifMultiple-helper');
var ifIndex = require('./util/ifIndex-helper');
var ifCond = require('./util/ifCond-helper');
var fractalGlobalContext = require('../catalog/global-context'); // importa un nostro file

var dest = './public';
var src = './src';

// Quando si esegue il metodo require, esso legge il valore di module.exports.
// Bisogna quindi assegnare a questa variabile il proprio codice
module.exports = {
  srcFolder: src,
  destFolder: dest,

  browserSync: {
    port: 9000,
    server: {
      baseDir: dest
    },
    notify: false,
    open: false
  },

  sass: {
    src: [
      src + '/sass/**/*.{sass,scss}',
      '/catalog/**/*.{sass,scss}'
    ],
    srcWatch: './**/*.{sass,scss}',
    dest: dest + '/css',
    settings: {
      indentedSyntax: true,
      outputStyle: 'expanded'
    },
    prefix: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 28',
      'ios >= 8',
      'edge >= 13',
      'android >= 4.4',
      'bb >= 10'
    ],
    // Css Selectors that should be removed from your css.
    // useful to remove unneeded thirdparty styles.
    remove: []
  },

  // Generic move task, useful to move assets that do
  // not need transformations. Keep in mind that
  // these files will not be watched and are only
  // moved when the default task is executed.
  move: [
    {
      src: src + '/fonts/**',
      dest: dest + '/fonts'
    },
    {
      src: src + '/preview/*.css',
      dest: dest + '/css'
    },
    {
      src: src + '/favicons/*.*',
      dest: dest
    },
    {
      src: src + '/json/**',
      dest: dest + '/json'
    },
    {
      src: src + '/embed/**',
      dest: dest + '/embed'
    },
    {
      src: src + '/thirdparty/**',
      dest: dest + '/thirdparty'
    }
  ],

  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },

  eslint: {
    src: src + '/js/**/*.js',
    options: './.eslintrc'
  },

  production: {
    dest: dest,

    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',

    cssDest: dest + '/css',
    jsDest: dest + '/js',

    cssCompressionOpts: {
      safe: true,
      mergeLonghand: false,
      autoprefixer: false,
      discardComments: {
        removeAll: true
      }
    },

    reportSrc: [
      dest + '/css/*.css',
      dest + '/js/*.js',
      dest + '/images/**/*'
    ],
  },

  svgSprite: {
    src: src + '/icons',
    glob: '**/*.svg',
    dest: dest + '/images',
    optionsInline: {
      mode: {
        symbol: {
          sprite: 'sprite.svg',
          dest: '.',
          render: {
            scss: {
              template: 'gulp/tpl/_sprite.scss',
              dest: '../../src/sass/base/_sprite.scss'
            }
          }
        }
      },
      variables: {
        cssPath: '../images/',
        rem: convertToRem
      }
    }
  },

  browserify: {
    bundleConfigs: [
      // Main Bundle
      {
        entries: src + '/js/main.js',
        dest: dest + '/js',
        outputName: 'main.js',
        extension: ['hbs'],
        global:'jquery',
        paths: [
          src + '/js/**/*.{js}',
          '/catalog/**/*.{js}',
          '/json/**/*.{json}'
        ]
      },

      // Bundle for preview
      {
        entries: src + '/preview/preview.js',
        dest: dest + '/js',
        outputName: 'preview.js'
      }
    ]
  },

  fractal: {
    default: {
      context: fractalGlobalContext
    },
    handlebars: {
      helpers: {
        ifMultiple: ifMultiple,
        ifIndex: ifIndex,
        ifCond: ifCond,
        json: function(context) {
            return JSON.stringify(context);
        },
        setTheme: function(theme) {
          if ((!global.rsiTheme) && (!global.forceStandardTheme)) {
            global.theme = theme;
          }
        },
        theme: function() {
          if (global.forceStandardTheme) {
            return null;
          }
          if (global.rsiTheme) {
            return global.rsiTheme;
          } else if (global.theme) {
            return global.theme;
          } else {
            return null;
          }
        },
        resetTheme: function() {
          if (global.rsiTheme) {
            global.theme = global.rsiTheme;
          } else {
            global.theme = null;
          }
        },
        themeCss: function() {
          if (global.forceStandardTheme) {
            return '/css/application.css';
          }
          if (global.rsiTheme) {
            return '/theme/' + global.rsiTheme + '/base/css/application.css';
          } else if (global.theme) {
            return '/theme/' + global.theme + '/base/css/application.css';
          } else {
            return '/css/application.css';
          }
        },
        rootPath: function(path) {
          if (global.forceStandardTheme) {
            return '/' + path;
          }
          if (global.rsiTheme) {
            return '/theme/' + global.rsiTheme + '/base/' + path;
          } else if (global.theme) {
            return '/theme/' + global.theme + '/base/' + path;
          } else {
            return '/' + path;
          }
        },
        imagePath: function(path) {
          if (global.forceStandardTheme) {
            return '/images/' + path;
          }
          if (global.rsiTheme) {
            return '/theme/' + global.rsiTheme + '/base/images/' + path;
          } else if (global.theme) {
            return '/theme/' + global.theme + '/base/images/' + path;
          } else {
            return '/images/' + path;
          }
        }
      }
    }
  }
};
