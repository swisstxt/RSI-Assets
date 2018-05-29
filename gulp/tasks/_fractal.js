'use strict';

const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
var runSequence = require('run-sequence');
var config = require('../config').fractal;

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();
const fractalPath = path.join(__dirname, '../..');

/*
 * Give your project a title.
 */
fractal.set('project.title', 'RSI Website');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(fractalPath, 'catalog'));
fractal.components.set('label', 'Catalog');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(fractalPath, 'docs'));

/*
 * Set the static HTML build destination.
 */
fractal.web.set('builder.dest', path.join(fractalPath, 'build'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(fractalPath, 'public'));

/* Set default preview of components inside components/preview.hbs */
fractal.components.set('default.preview', '@preview');

/* Set the default global context */
fractal.components.set('default.context', config.default.context);

/* Configure Handlebars integration */
const hbs = require('@frctl/handlebars')(config.handlebars);

fractal.components.engine(hbs); /* set as the default template engine for components */
fractal.docs.engine(hbs); /* you can also use the same instance for documentation, if you like! */


// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function() {
    runSequence('default', function() {
        const builder = fractal.web.builder();
        builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
        builder.on('error', err => logger.error(err.message));
        return builder.build().then(() => {
            logger.success('Fractal build completed!');
        });
    });
});

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('fractal:buildall', function() {
  runSequence('fractal:build', function() {
      var folders = getFolders('./src/theme');
      var i = 0;
      for (i = 0; i < folders.length; i++) {
        var folder = folders[i];
        global.rsiTheme = folder;
        config.default.context["theme"] = folder;
        fractal.web.set('builder.dest', path.join(fractalPath, 'build/theme/' + folder));
        runSequence('default', function() {
            const builder = fractal.web.builder();
            builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
            builder.on('error', err => logger.error(err.message));
            return builder.build().then(() => {
              logger.success('Fractal build completed!');
            });
        });
      }
  });
});