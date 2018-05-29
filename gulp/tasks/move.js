'use strict';

var gulp          = require('gulp');
var config        = require('../config').move;
const path = require('path');
const fs = require('fs');

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('move', function(cb) {
  if (config.length <= 0) {
    return cb();
  }

  config.forEach( function(entry){
    gulp.src(entry.src)
      .pipe(gulp.dest(entry.dest));
  });

  //Copia la cartella images e la incolla nel tema specifico
  gulp.src('./src/theme/' + global.rsiTheme + '/base/images/**')
	.pipe(gulp.dest('./public/theme/' + global.rsiTheme + '/base/images'))

  return cb();
});

gulp.task('move:all', function(cb) {
  var folders = getFolders('./src/theme');
  var i = 0;
  if (folders.length > 0) {
	for (i = 0; i < folders.length; i++) {
	  var folder = folders[i];
	  var config = [
	  	{
	  		src: './src/theme/' + folder + '/base/images/**',
	  		dest: './public/theme/' + folder + '/base/images',
	  	},
	  	{
	  		src: './src/theme/' + folder + '/base/css/*.css',
	  		dest: './public/theme/' + folder + '/base/css',
	  	}
	  ]
	  config.forEach(function(entry){
	    gulp.src(entry.src)
	      .pipe(gulp.dest(entry.dest));
	  });
	}
  }
  return cb();
});
