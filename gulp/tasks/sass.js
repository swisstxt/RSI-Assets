'use strict';

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var handleErrors  = require('../util/handleErrors');
var config        = require('../config').sass;
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var importUrls    = require('postcss-import');
var removeClasses = require('../util/removeCssClasses')(config.remove);
var header        = require('gulp-header');
var fs            = require('fs');
var path          = require('path');

var procesors = [
  importUrls(),
  removeClasses,
  autoprefixer({ browsers: config.prefix })
];

// Definisco un task denominato sass, che effetua la compilazione dei file sass in css
gulp.task('sass', function () {
  if (global.rsiTheme) {
    gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
      .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
      .pipe(sourcemaps.init())
      .pipe(sass(config.settings))
      .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
      .pipe(postcss(procesors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest)); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)

    return gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
      .pipe(header(fs.readFileSync('./src/theme/' + global.rsiTheme + '/base/theme.sass', 'utf8')))
      .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
      .pipe(sourcemaps.init())
      .pipe(sass(config.settings))
      .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
      .pipe(postcss(procesors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/theme/' + global.rsiTheme + '/base/css')); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)
  } else {
    return gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
      .pipe(sourcemaps.init())
      .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
      .pipe(sass(config.settings))
      .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
      .pipe(postcss(procesors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest)); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)
  }
});


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

// Definisco un task denominato sass, che effetua la compilazione dei file sass in css
gulp.task('sass:all', function () {
  var folders = getFolders('./src/theme');
  if (folders.length > 0) {
    gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
      .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
      .pipe(sourcemaps.init())
      .pipe(sass(config.settings))
      .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
      .pipe(postcss(procesors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest)); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)
      
      var i = 0;
      for (i = 0; i < folders.length; i++) {
        var folder = folders[i];
        gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
          .pipe(header(fs.readFileSync('./src/theme/' + folder + '/base/theme.sass', 'utf8')))
          .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
          .pipe(sourcemaps.init())
          .pipe(sass(config.settings))
          .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
          .pipe(postcss(procesors))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./public/theme/' + folder + '/base/css')); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)
      }
  } else {
      return gulp.src(config.src) // gulp.src legge dei file e li prepara per essere passati alle azioni successive tramite pipe
        .pipe(header('$production: ' + (global.isProduction ? 'true' : 'false') + ';'))
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors) // se l'operazione precedente ha generato un evento "error" esegui handleErrors
        .pipe(postcss(procesors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest)); // gulp.dest salva il risultato nella cartella config.dest (in questo caso css)
  }
});
