'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');

// Il task clean elimina tutto il contenuto di public (definito in config.destFolder)
gulp.task('clean', function(cb){
  del(config.destFolder, {dot: true, force: true}).then(paths => {
    cb();
  });
});
