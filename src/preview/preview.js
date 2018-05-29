var $ = require('jquery');
var hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));

$(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  var $body = $('body');
  var $toggler = $('.js-toggler');

  var cssState = {
    closed: 'is-interface-closed'
  };

  $toggler.on('click', function(e) {
    e.preventDefault();
    if ($body.hasClass(cssState.closed)) {
      $body.removeClass(cssState.closed);
      window.location.hash = "";
    } else {
      $body.addClass(cssState.closed);
      window.location.hash = "closed";
    }
  });

  if(window.location.hash && window.location.hash === '#closed') {
    $body.addClass(cssState.closed);
  }

  var $markdownText = $('.js-markdown');

  if ($markdownText.length > 0) {
    var $titles = $markdownText.find('h2');
    var $markdownMenu = $('.js-markdown-menu');

    $titles.each(function(idx, el){
        var $el = $(el);
        var id = $el.attr('id');
        var title = $el.text();

        var $a = $('<a>');
        var $li = $('<li>');
        $a.text(title).attr('href', '#' + id);
        $li.append($a);
        $markdownMenu.append($li);
    });
  }

});