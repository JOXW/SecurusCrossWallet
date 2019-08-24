//#region Fields

//#region Login Fields
var nodeList;
var password;
var walletPath;
//#endregion

//#region Load Wallet Data Fields
const pbkdf2 = require('pbkdf2');
const fs = require('fs');
const crypto = require('crypto');
const PBKDF2_ITERATIONS = 500000;
const IS_A_WALLET_IDENTIFIER = Buffer.from([
    0x49, 0x66, 0x20, 0x49, 0x20, 0x70, 0x75, 0x6c, 0x6c, 0x20, 0x74,
    0x68, 0x61, 0x74, 0x20, 0x6f, 0x66, 0x66, 0x2c, 0x20, 0x77, 0x69,
    0x6c, 0x6c, 0x20, 0x79, 0x6f, 0x75, 0x20, 0x64, 0x69, 0x65, 0x3f,
    0x0a, 0x49, 0x74, 0x20, 0x77, 0x6f, 0x75, 0x6c, 0x64, 0x20, 0x62,
    0x65, 0x20, 0x65, 0x78, 0x74, 0x72, 0x65, 0x6d, 0x65, 0x6c, 0x79,
    0x20, 0x70, 0x61, 0x69, 0x6e, 0x66, 0x75, 0x6c, 0x2e
]);
const IS_CORRECT_PASSWORD_IDENTIFIER = Buffer.from([
    0x59, 0x6f, 0x75, 0x27, 0x72, 0x65, 0x20, 0x61, 0x20, 0x62, 0x69,
    0x67, 0x20, 0x67, 0x75, 0x79, 0x2e, 0x0a, 0x46, 0x6f, 0x72, 0x20,
    0x79, 0x6f, 0x75, 0x2e
]);
//#endregion

//#endregion

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
        case ('AddressTemplate'):
            break;
        case ('BackupTemplate'):
            break;
        case ('BalanceTemplate'):
            LoadWalletFile();
            break;
        case ('HomeTemplate'):
            break;
        case ('TranserTemplate'):
            break;
    }
}

function exit() {
    window.close();
}
//#endregion

//#region Login Template Data
function LoadNodes() {
    nodeList = document.getElementById('nodeList');

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

        for (i in arr.nodes) {
            var singleNode = new Array(4);
            singleNode[0] = arr.nodes[i].name;
            singleNode[1] = arr.nodes[i].url;
            singleNode[2] = arr.nodes[i].port;
            singleNode[3] = arr.nodes[i].ssl;
            nodeArray[i] = singleNode;
        }

        for (i in nodeArray) {
            var opt = document.createElement('option');
            opt.value = nodeArray[i][1];
            opt.innerHTML = nodeArray[i][1];
            nodeList.appendChild(opt);
        }
    }
}

function collectLoginData() {
    password = document.getElementById('password').value;
    walletPath = document.getElementById('walletPath');
}

function openWallet() {
    collectLoginData();
    openPage('BalanceTemplate', 'Balance');
}
//#endregion

//#region Balance Template Data
function LoadWalletFile() {

    var filePath = walletPath.value.replace("C:\\fakepath\\", "");

    console.log(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        /* Take a slice containing the wallet identifier magic bytes */
        const magicBytes1 = data.slice(0, IS_A_WALLET_IDENTIFIER.length);

        if (magicBytes1.compare(IS_A_WALLET_IDENTIFIER) != 0) {
            throw new Error('File is missing wallet identifer magic bytes!');
        }

        /* Remove the magic bytes */
        data = data.slice(IS_A_WALLET_IDENTIFIER.length, data.length);

        /* Grab the salt from the data */
        const salt = data.slice(0, 16);

        /* Remove the salt from the data */
        data = data.slice(salt.length, data.length);

        /* Derive our key with pbkdf2, 16 bytes long */
        const key = pbkdf2.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 16, 'sha256');

        /* Setup the aes decryption */
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, salt);

        var decrypted;

        try {
            /* Perform the decryption */
            decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
        } catch (err) {
            throw new Error('Wrong password!');
        }

        /* Grab the second set of magic bytes */
        const magicBytes2 = decrypted.slice(0, IS_CORRECT_PASSWORD_IDENTIFIER.length);

        /* Verify the magic bytes are present */
        if (magicBytes2.compare(IS_CORRECT_PASSWORD_IDENTIFIER) != 0) {
            throw new Error('Wrong password!');
        }

        /* Remove the magic bytes */
        decrypted = decrypted.slice(IS_CORRECT_PASSWORD_IDENTIFIER.length, decrypted.length);

        /* Print out the data */
        console.log(JSON.stringify(JSON.parse(decrypted), null, 4));
    });
}
//#endregion