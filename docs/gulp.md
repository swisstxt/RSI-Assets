---
title: Comandi gulp
label: Comandi gulp
---

<br />
<br />
# Comandi gulp

*  `gulp default` effettua la compilazione.
*  `gulp watch` ricompila ogni volta che viene modficato un file, per bloccarlo `ctrl + c`.
*  `gulp production` compila i file in maniera minimizzata per essere usati in produzione.
*  `gulp fractal:build` compila i file in maniera da essere mostrati su un server come anteprima.
*  `gulp --theme nome_tema` compila i file usando il sass del tema indicato ad esempio `gulp --theme la1_pattichiari`.
*  `gulp watch --theme nome_tema` come precedente ma compila ad ogni modifica di file.
*  `gulp watch:all` compila tutte le skin
*  `gulp sass:all` seguito da `gulp move:all` seguito da `gulp minifyCss:all` compila tutti i temi.


Importante: Ogniqualvolta lanciate un comando di compilazione la cartella dist viene eliminata! Non effettuate modifiche al suo interno.

Altre informazioni su gulp le trovate qui:

http://gulpjs.com/<br />
https://github.com/gulpjs/gulp<br />
https://github.com/gulpjs/gulp/blob/master/docs/README.md