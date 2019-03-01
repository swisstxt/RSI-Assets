
const RSI_BASE_URL = "https://www.rsi.ch";


function getHeader(headerId,sectionId) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(headerId).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", RSI_BASE_URL + "/rsi-api/headerFooter/header/"+sectionId, true);
    xhttp.send();
}
function getFooter(footerId,sectionId) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(footerId).innerHTML = this.responseText;
            console.log(this.responseText);

            var imported = document.createElement('script');
            imported.src = RSI_BASE_URL + '/static/newHome/js/main-min.js';
            document.head.appendChild(imported);
        }
    };
    xhttp.open("GET", RSI_BASE_URL + "/rsi-api/headerFooter/footer/"+sectionId, true);
    xhttp.send();
}

function getHeaderFooter(headerId, footerId,sectionId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var headerFooter = this.responseText;
            var splitStr = headerFooter.split("[split]");
            document.getElementById(headerId).innerHTML = splitStr[0];
            document.getElementById(footerId).innerHTML = splitStr[1];

            var imported = document.createElement('script');
            imported.src = '/static/newHome/js/main.js';
            document.head.appendChild(imported);

        }
    };
    xhttp.open("GET", "/rsi-api/headerFooter/headerfooter/"+sectionId, true);
    xhttp.send();
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

function radioChannel(mediaURL) {
    window.open(mediaURL, 'Player', 'resizable=no,width=201,height=430 ,left=' + (screen.width - 214) + ',top=5,screenX=0,screenY=0');
}

