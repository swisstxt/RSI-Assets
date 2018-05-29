'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Run this to compress all the things!
gulp.task('production', function(cb){
  global.isProduction = true;
  // This runs only if the karma tests pass
  //runSequence('default:all', ['minifyCss', 'uglifyJs'], 'size-report', cb);
  runSequence('default:all', 'size-report', cb);
});
