const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const splash = require('@trodi/electron-splashscreen');


let win

function createWindow() {
    const winOpts = {
        title: "Securus Wallet",
        icon: path.join(__dirname, 'src/assets/icon.ico'),
        frame: true,
        width: 1400,
        height: 900,
        show: false,
        center: true,
        autoHideMenuBar: false,
        menuBarVisibility: false,
    };

    win = splash.initSplashScreen({
        windowOpts: winOpts,
        templateUrl: path.join(__dirname, "src/html/splash.html"),
        delay: 0,
        minVisible: 2000,
        splashScreenOpts: {
            width: 1092,
            height: 606,
            transparent: true
        },
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //open devtools
    //win.webContents.openDevTools();

    win.once('ready-to-show', () => {
        //win.show();
        win.setTitle("Securus Wallet");
    });

    win.on('closed', () => {
        win = null
    })

    win.on('closed', () => {
        win = null;
    });

    win.setMenu(null);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})