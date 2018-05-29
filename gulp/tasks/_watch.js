'use strict';
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
   - watchers are made using `gulp-watch` so new files are automatically watched
*/

var gulp          = require('gulp');
var config        = require('../config'); // importa un nostro file
var browserSync   = require('browser-sync');
var runSequence   = require('run-sequence');
var watch         = require('gulp-watch');


// gulp-watch permette tramite una stringa di controllare se un file è stato modificato.
//
// La stringa contiene il percorso ed eventuali "wildcards" (asterischi *)
//
// In un percorso, il doppio asterisco /**/ indica qualsiasi cartella e sottocartella, non importa il livello
// Invece *.svg (esempio) indica tutti i file che finiscono con .svg

// Definisco un task "watch" utilizzabile con "gulp watch". Non ha dipendenze.
gulp.task('watch', function() {
  if (!global.rsiTheme) {
    global.forceStandardTheme = true;
  }
  runSequence('default', 'move:all', ['watchify', 'browserSync', 'fractal:start']);

  // verificamo che se un qualsiasi file svg nel percorso:
  //    watch('./src/icons/**/*.svg', function(){...
  // viene eseguito il codice runSequence('sprite', browserSync.reload);
  watch(config.svgSprite.src + '/' + config.svgSprite.glob, function(){
    runSequence('sprite', browserSync.reload);
  });

  watch(config.eslint.src, function(){
    runSequence('eslint');
  });

  watch(config.sass.srcWatch, function(){
    runSequence('sasslint', 'sass', browserSync.reload);
  });

  watch(config.images.src, function(){
    runSequence('images', browserSync.reload);
  });

  watch(config.srcFolder + '/theme/**/images/**', function(){
    runSequence('move', browserSync.reload);
  });

  watch(config.srcFolder + '/preview/*.css', function(){
    runSequence('move', browserSync.reload);
  });
});

gulp.task('watch:all', function() {
  runSequence('default', 'move:all', ['watchify', 'browserSync', 'fractal:start']);

  // verificamo che se un qualsiasi file svg nel percorso:
  //    watch('./src/icons/**/*.svg', function(){...
  // viene eseguito il codice runSequence('sprite', browserSync.reload);
  watch(config.svgSprite.src + '/' + config.svgSprite.glob, function(){
    runSequence('sprite', browserSync.reload);
  });

  watch(config.eslint.src, function(){
    runSequence('eslint');
  });

  watch(config.sass.srcWatch, function(){
    runSequence('sasslint', 'sass:all', browserSync.reload);
  });

  watch(config.images.src, function(){
    runSequence('images', browserSync.reload);
  });

  watch(config.srcFolder + '/theme/**/images/**', function(){
    runSequence('move:all', browserSync.reload);
  });

  watch(config.srcFolder + '/preview/*.css', function(){
    runSequence('move:all', browserSync.reload);
  });
});

