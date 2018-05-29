/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.

  Quando viene eseguito gulp, viene caricato questo file.
  Nico ha usato require-dir per separare i task in file distinti.
*/

// Con il metodo "require" chiediamo a Node.js il modulo require-dir (che deve essere precedentemente installato)
// Questo modulo viene assegnato alla variabile requireDir
var requireDir = require('require-dir');

global.isProduction = false;
global.rsiTheme = null;
global.forceStandardTheme = false; // settato nel task watch
var i = process.argv.indexOf("--theme");
if (i > -1) {
    global.rsiTheme = process.argv[i+1];
}

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
