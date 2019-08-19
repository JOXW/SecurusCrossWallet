/*Initial open StartScreen */
var div = document.getElementById('mainDiv');
let template = document.getElementById('StartScreenTemplate').content;
div.appendChild(template);

/*Inital set StartScreenHeader */
document.getElementById("header").innerHTML = "Welcome";

/*Removes mainDiv*/
function removeMainDiv() {
    var div = document.getElementById('mainDiv');
    div.remove();
}

/*Add mainDiv*/
function addMainDiv() {
    document.body.innerHTML += '<div id=\'mainDiv\'></div>'
}

/*Navigate to other Page*/
function openPage(PageName, Header) {
    removeMainDiv();
    addMainDiv();
    let template = document.getElementById(PageName).content;
    var div = document.getElementById('mainDiv');
    div.appendChild(template);
    document.getElementById("header").innerHTML = Header;
}