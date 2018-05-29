'use strict'; // direttiva per node.js che segnala l'uso improprio di alcune parti di javascript, come ad esempio dimenticarsi di dichiarare una variabile con var

// Importiamo i moduli gulp e run-sequence
var gulp        = require('gulp');
var runSequence = require('run-sequence'); // run-sequence serve per eseguire i task in modo sequenziale e/o parallelo
var fs          = require('fs');

// gulp.task definisce un task. Il primo parametro indica il nome del task, oppure "default" per quello eseguito
// se non viene dato un nome (quindi eseguendo gulp direttamente)
// Il secondo parametro (opzionale) indica (dentro un array) una lista di task da eseguire prima dello stesso.
// Alla fine c'è il codice del task stesso (dentro una function)
// cb (callback) sarebbe un parametro passato al task
gulp.task('default', ['clean'], function(cb){
    runSequence('writeDynamicConfig', 'sprite', 'eslint', ['sasslint', 'sass', 'browserify'], 'images', 'move', cb);
});

gulp.task('default:all', function(cb){
	/* TODO check minifyCss:all it doesn't work */
    runSequence('default', 'sass:all', 'move:all', 'minifyCss:all', cb);
});

// Scrive una config dinamica che verrà letta da main.js e inserita in global / window sotto il nome window.dynamicConfig
gulp.task('writeDynamicConfig', function(cb) {
	// Path per gulp watch / development
	var ajaxPaths = {
		'programmi_az': '/json/itemProd.json',
		'gallery': '/json/gallery.json?id=',
		'svgSprite': '/images/sprite.svg'
	};
	// Path per gulp production
	if (global.isProduction) {
		ajaxPaths['programmi_az'] = '/external/jsonAZpage.do';
		ajaxPaths['gallery'] = '/rsi-api/gallery/id/';
		ajaxPaths['svgSprite'] = '/static/newHome/images/sprite.svg';
	}
	return fs.writeFile('./src/json/dynamic_config.json', JSON.stringify({
		isProduction: global.isProduction,
		ajaxPaths: ajaxPaths
	}), cb);
});