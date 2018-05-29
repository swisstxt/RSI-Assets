'use strict';

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browserSync; // importa il contenuto di config.js, ma assegna il contenuto del campo browserSync

gulp.task('browserSync', function() {
  browserSync.init(config);
});
