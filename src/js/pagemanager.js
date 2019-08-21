//#region Initial PageManagement 

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

    switch (PageName) {
        case ('LoginTemplate'):
            LoadNodes();
            break;
        case ('StartScreenTemplate'):
            break;
        case ('AdressTemplate'):
            break;
        case ('BackupTemplate'):
            break;
        case ('BalanceTemplate'):
            break;
        case ('HomeTemplate'):
            break;
        case ('TranserTemplate'):
            break;
    }
}
//#endregion

//#region Login Template Data
function LoadNodes() {
    var nodeList = document.getElementById('nodeList');

    var xmlhttp = new XMLHttpRequest();
    var url = 'https://raw.githubusercontent.com/JOXW/securuscoin_nodes/master/securuscoin_nodes.json';

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {
        var nodeArray = new Array(arr.nodes.length);

        for(i in arr.nodes){
            var singleNode = new Array(4);
            singleNode[0] = arr.nodes[i].name;
            singleNode[1] = arr.nodes[i].url;
            singleNode[2] = arr.nodes[i].port;
            singleNode[3] = arr.nodes[i].ssl;
            nodeArray[i] = singleNode;
        }    

        for(i in nodeArray){
            var opt = document.createElement('option');
            opt.value = nodeArray[i];
            opt.innerHTML = nodeArray[i];
            nodeList.appendChild(opt);
        }
    }   
}
//#endregion