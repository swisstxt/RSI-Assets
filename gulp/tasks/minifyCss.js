'use strict';

var gulp      = require('gulp');
var config    = require('../config').production;
var postcss   = require('gulp-postcss');
var nano      = require('cssnano');
const path = require('path');
const fs = require('fs');

var procesors = [
  nano(config.cssCompressionOpts)
];

gulp.task('minifyCss', function() {
  if (global.rsiTheme) {
    gulp.src(config.cssSrc)
	  .pipe(postcss(procesors))
	  .pipe(gulp.dest(config.cssDest));

	return gulp.src('./public/theme/' + global.rsiTheme + '/base/css/*.css')
	    .pipe(postcss(procesors))
	    .pipe(gulp.dest('./public/theme/' + global.rsiTheme + '/base/css'));
  } else {
    return gulp.src(config.cssSrc)
	    .pipe(postcss(procesors))
	    .pipe(gulp.dest(config.cssDest));
  }
});

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('minifyCss:all', function() {
  var folders = getFolders('./src/theme');
  if (folders.length > 0) {
    gulp.src('./public/css/application.css')
	  .pipe(postcss(procesors))
	  .pipe(gulp.dest('./public/css'));
      
	var i = 0;
	for (i = 0; i < folders.length; i++) {
	  var folder = folders[i];
	  gulp.src('./public/theme/' + folder + '/base/css/application.css')
	    .pipe(postcss(procesors))
	  	.pipe(gulp.dest('./public/theme/' + folder + '/base/css'));
	}
  } else {
    return gulp.src('./public/css/application.css')
	  .pipe(postcss(procesors))
	  .pipe(gulp.dest('./public/css'));
  }
});
