var $ = require('jquery');

var jsonItems = '';

var titleSearch = '';
var argument = '';
var letterSelected = '';
var vector = '';

var letters = ['#', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var hashmap = {};
hashmap.A = 'ABC';
hashmap.B = 'ABC';
hashmap.C = 'ABC';
hashmap.D = 'DEF';
hashmap.E = 'DEF';
hashmap.F = 'DEF';
hashmap.G = 'GHI';
hashmap.H = 'GHI';
hashmap.I = 'GHI';
hashmap.J = 'JKL';
hashmap.K = 'JKL';
hashmap.L = 'JKL';
hashmap.M = 'MNO';
hashmap.N = 'MNO';
hashmap.O = 'MNO';
hashmap.P = 'PQR';
hashmap.Q = 'PQR';
hashmap.R = 'PQR';
hashmap.S = 'STU';
hashmap.T = 'STU';
hashmap.U = 'STU';
hashmap.V = 'VWX';
hashmap.W = 'VWX';
hashmap.X = 'VWX';
hashmap.Y = 'YZ';
hashmap.Z = 'YZ';


// Class
// ============================================

var $azChoise;

var resetTitleSearch;
var resetArgument;
var resetLetterSelected;
var resetVector;

function SearchAZ($el) {

  $azChoise = $el.find('.js-filterAz_link');
  var $chanelChoise = $el.find('.js-label');
  var $textChoise = $el.find('.js-fieldSearch_input');

  resetTitleSearch = '';
  resetArgument = '';
  resetLetterSelected = '';
  resetVector = '';
  searchParameter();

  $azChoise.on('click', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('js-filterAz_link-disabled')) {
      searchParameter();
    }
  });

  $chanelChoise.on('click', function(e) {
    e.preventDefault();
    resetTitleSearch = 'reset';
    resetArgument = 'reset';
    resetLetterSelected = 'reset';
    resetVector = '';
    searchParameter();
  });
  $('.js-filterTopic_list').on('click', 'li', function(e) {
    e.preventDefault();
    resetTitleSearch = 'reset';
    resetArgument = '';
    resetLetterSelected = 'reset';
    resetVector = 'reset';
    searchParameter();
  });

  $textChoise.on('keyup', function(e) {
    e.preventDefault();
    resetTitleSearch = '';
    resetArgument = 'reset';
    resetLetterSelected = 'reset';
    resetVector = 'reset';
    searchParameter();
  });
}

function initializeVector() {
  $('.js-buttonTabs a').removeClass('is-active');
  $('.js-buttonTabs a').first().addClass('is-active');
}
function initializeTitleSearch() {
  $('.js-fieldSearch_input').val('');
}
function initializeArgument() {
  $('.js-filterTopic_title').text('Tutti gli argomenti');
  $('.js-filterTopic_listItem').removeClass('is-active');
  $('.js-filterTopic_listItem').first().addClass('is-active');
}
function initializeLetter() {
  $('.c-filterAz_item').find('a').removeClass('is-active');
  $('.c-filterAz_item').first().find('a').addClass('is-active');
}

function searchParameter() {

  titleSearch = $('.js-fieldSearch_input').val().trim();
  argument = $('.js-filterTopic_title').html().trim();
  letterSelected = $('.c-filterAz_list').find('.is-active').text();
  if (letterSelected === '0-#') { letterSelected = '0'; }
  vector = $('.js-buttonTabs').find('.is-active').html();

  /*
  console.log('resetTitleSearch ' + resetTitleSearch);
  console.log('resetArgument ' + resetArgument);
  console.log('resetLetterSelected ' + resetLetterSelected);
  console.log('resetVector ' + resetVector);
  */

  if (resetTitleSearch === 'reset') {
    initializeTitleSearch();
    titleSearch = '';
  }
  if (resetArgument === 'reset') {
    initializeArgument();
    argument = 'Tutti gli argomenti';
  }
  if (resetLetterSelected === 'reset') {
    initializeLetter();
    letterSelected = 'Tutti';
  }
  if (resetVector === 'reset') {
    initializeVector();
    vector = 'Tutti i canali';
  }

  console.log('titleSearch ' + titleSearch);
  console.log('argument ' + argument);
  console.log('letterSelected ' + letterSelected);
  console.log('vector ' + vector);
  console.log('-----------------------------');
  jsonParse();

  resetTitleSearch = '';
  resetArgument = '';
  resetLetterSelected = '';
  resetVector = '';
}

function jsonParse() {
  if (jsonItems === '') {
    $.ajax(global.dynamicConfig.ajaxPaths.programmi_az)
      .done(function(data) {
        console.log('success ' + data.Items.length);
        jsonItems = data.Items;
        writeJson(jsonItems);
      })
      .fail(function(request, error) {
        console.log('error ' + error);
      })
      .always(function() {
        console.log('complete');
      });
  } else {
    writeJson(jsonItems);
  }
}

function writeJson(list) {
  $('#js-container-resultsAZ').empty();
  var filteredList = list;

  var argumentsArray = [];
  $('.js-filterTopic_list').empty();
  $('.js-filterTopic_list').append('<li class="c-filterTopic_listItem js-filterTopic_listItem">Tutti gli argomenti <span class="c-filterTopic_listItem_Checkmark"><svg class="c-icon c-icon-checkmark "><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite+'#checkmark"></use></svg></span></li>');
  for (i = 0; i < filteredList.length; i++) {
    var tmpListArguments = filteredList[i].argument;
    for (var a = 0; a < tmpListArguments.length; a++) {
      if (argumentsArray.indexOf(tmpListArguments[a].label) === -1) {
        if (tmpListArguments[a].label !== 'No Topic' && tmpListArguments[a].label !== 'Web Series' && tmpListArguments[a].label !== 'no topic Label this ID') {
          argumentsArray.push(tmpListArguments[a].label);
        }
      }
    }
  }

  argumentsArray.sort();
  $(argumentsArray).each(function( index ) {
    $('.js-filterTopic_list').append('<li class="c-filterTopic_listItem js-filterTopic_listItem">' + argumentsArray[index] + ' <span class="c-filterTopic_listItem_Checkmark"><svg class="c-icon c-icon-checkmark "><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite+'#checkmark"></use></svg></span></li>');
  });
  $( '.js-filterTopic_listItem' ).each(function() {
    if ($( this ).text().trim() === $('.js-filterTopic_title').text().trim()) {
      $( this).addClass('is-active');
    }
  });

  // filtro per vettori (channel)
  if (vector !== 'Tutti i canali') {
    var listVector = [];
    for (i = 0; i < filteredList.length; i++) {
      if (vector.toLowerCase() === filteredList[i].vector) {
        listVector.push(filteredList[i]);
      }
    }
    filteredList = listVector;
  }

  // filtro per argomento
  if (argument !== 'Tutti gli argomenti') {
    var listArgument = [];
    for (i = 0; i < filteredList.length; i++) {
      tmpListArguments = filteredList[i].argument;
      for (a = 0; a < tmpListArguments.length; a++) {
        if (argument === tmpListArguments[a].label) {
          listArgument.push(filteredList[i]);
          break;
        }
      }
    }
    filteredList = listArgument;
  }

  // filtro per ricerca
  if (titleSearch !== '') {
    var listSearch = [];
    for (i = 0; i < filteredList.length; i++) {
      var titleItem = filteredList[i].title.toLowerCase();
      if (titleItem.indexOf(titleSearch.toLowerCase()) !== -1) {
        listSearch.push(filteredList[i]);
      }
    }
    filteredList = listSearch;
  }

  $azChoise.addClass('js-filterAz_link-disabled').addClass('c-filterAz_link-disabled');
  $azChoise.find('span').addClass('js-filterAz_link-disabled').addClass('c-filterAz_link-disabled');
  $('#allLetter').removeClass('js-filterAz_link-disabled').removeClass('c-filterAz_link-disabled');
  for (var i = 0; i < filteredList.length; i++) {
    $('#letter' + filteredList[i].startLetter).removeClass('js-filterAz_link-disabled').removeClass('c-filterAz_link-disabled');
    $('#letter' + hashmap[filteredList[i].startLetter]).removeClass('js-filterAz_link-disabled').removeClass('c-filterAz_link-disabled');
    $('#char' + filteredList[i].startLetter).removeClass('c-filterAz_link-disabled');
  }

  if (filteredList.length > 0) {
  // filtro per lettere
    for (var l = 0; l < letters.length; l++) {
      var letterSelectedList = letterSelected.split(' ');
      for (var ls = 0; ls < letterSelectedList.length; ls++) {
        if (letters[l] === letterSelectedList[ls] || letterSelectedList[ls] === 'Tutti') {
          var listA = [];
          for (i = 0; i < filteredList.length; i++) {
            if (letters[l] === filteredList[i].startLetter) {
              listA.push(filteredList[i]);
            }
          }
          if (listA.length > 0) {
            writeTitle($('#js-container-resultsAZ'), letters[l]);
            writeList($('#js-container-resultsAZ'), listA);
          }
        }
      }
    }
  } else {
    $('#js-container-resultsAZ').html('<div class="c-emptyPage c-emptyPage-light c-emptyPage-fixedWidth u-push-btm-triple u-push-top-triple"><div class="c-emptyPage_iconWrapper"><svg class="c-icon c-icon-search c-emptyPage_icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+global.dynamicConfig.ajaxPaths.svgSprite+'#search"></use></svg></div><h3 class="c-emptyPage_title">Nessun risultato</h3><p class="c-emptyPage_desc">Non abbiamo trovato un programma che corrisponde ai criteri di ricerca.</p></div>');
  }
}

function writeTitle(container, letter) {
  var titleLetter = letter;
  if (titleLetter === 0) {
    titleLetter = '0-#';
  }
  $(container).append('<div class="c-sectionTitle c-sectionTitle-light c-sectionTitle-stripe@xs u-push-btm-half"><h3 class="c-sectionTitle_heading"><span class="c-sectionTitle_label">' + titleLetter + '</span></h3></div>');
}

function writeList(container, list) {
  var buffer = '';
  buffer = buffer + '<div class="row row-sm-clear-2 u-push-btm-double">';

  for (var i = 0; i < list.length; i++) {
    buffer = buffer + '<div class="col-md-6">';

    if (i === 1) {
      buffer = buffer + '<hr class="u-d-none@md u-push-vert-half">';
    } else if (i > 1) {
      buffer = buffer + '<hr class="u-push-vert-half">';
    }

    buffer = buffer + '<div class="c-teaserSmall c-teaserSmall-light c-teaserSmall-imgBig@md">';

    buffer = buffer + '<div class="c-teaserSmall_img">';
    buffer = buffer + '<div class="c-embed c-embed-16:9">';
    buffer = buffer + '<a class="c-embed_link" href="' + list[i].url + '">';
    buffer = buffer + '<img class="c-embed_media-img" src="' + list[i].image + '" style="width:100%" alt="">';
    buffer = buffer + '</a>';
    buffer = buffer + '</div>';
    buffer = buffer + '</div>';

    buffer = buffer + '<div class="c-teaserSmall_content">';
    buffer = buffer + '<div class="c-teaserSmall_header">';
    buffer = buffer + '<a href="' + list[i].sectionUrl + '" class="c-label js-label c-label-light c-label-small c-label-round">' + list[i].sectionName.replace('-', ' ') + '</a>';
    /*
    if (list[i].publishDate) {
      buffer = buffer + '<a href="' + list[i].url + '" class="c-label js-label c-label-active c-label-small u-float-rgt">new</a>';
    }
    */
    buffer = buffer + '</div>';
    buffer = buffer + '<h2 class="c-teaserSmall_title">';
    buffer = buffer + '<a href="' + list[i].url + '" class="c-teaserSmall_titleLink">' + list[i].title + '</a>';
    buffer = buffer + '</h2>';
    // buffer = buffer + '<p class="c-teaserSmall_desc">' + list[i].subhead + '</p>';
    buffer = buffer + '<div class="c-teaserSmall_liveMark u-d-none@md">';
    buffer = buffer + '</div>';
    buffer = buffer + '</div>';

    buffer = buffer + '</div>';
    buffer = buffer + '</div>';
  }

  buffer = buffer + '</div>';
  $(container).append(buffer);
}

module.exports = SearchAZ;
