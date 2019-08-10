const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const splash = require('@trodi/electron-splashscreen');

let win

// function createWindow() {
//     win = new BrowserWindow({
//         width: 1400,
//         height: 900,
//         icon: 'src/assets/icon.ico',
//     })

//     win.loadFile('src/html/index.html')

//     win.on('closed', () => {
//         win = null
//     })
// }

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
        // webPreferences: {
        //     nativeWindowOpen: true,
        //     nodeIntegrationInWorker: true,
        // },
    };

    win = splash.initSplashScreen({
        windowOpts: winOpts,
        templateUrl: path.join(__dirname, "src/html/splash.html"),
        delay: 0,
        minVisible: 5000,
        splashScreenOpts: {
            width: 1092,
            height: 606,
            transparent: true
        },
    });

    //load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // open devtools
    //win.webContents.openDevTools();

    // show windosw
    // win.once('ready-to-show', () => {
    //     //win.show();
    //     win.setTitle("Securus Wallet");
    //     if (platform !== 'darwin') {
    //         tray.setToolTip(config.appSlogan);
    //     }
    // });

    win.once('ready-to-show', () => {
        //win.show();
        win.setTitle("Securus Wallet");
    });

    win.on('closed', () => {
        win = null
    })

    // win.on('close', (e) => {
    //     if ((settings.get('tray_close') && !app.needToExit && platform !== 'darwin')) {
    //         e.preventDefault();
    //         win.hide();
    //     } else if (app.prompExit) {
    //         e.preventDefault();
    //         if (app.prompShown) return;
    //         let msg = 'Are you sure want to exit?';
    //         app.prompShown = true;
    //         dialog.showMessageBox({
    //             type: 'question',
    //             buttons: ['Yes', 'No'],
    //             title: 'Exit Confirmation',
    //             message: msg
    //         }, function(response) {
    //             app.prompShown = false;
    //             if (response === 0) {
    //                 app.prompExit = false;
    //                 win.webContents.send('cleanup', 'Clean it up, Dad!');
    //             } else {
    //                 app.prompExit = true;
    //                 app.needToExit = false;
    //             }
    //         });
    //     }
    // });

    // if (platform !== 'darwin') {
    //     let contextMenu = Menu.buildFromTemplate([
    //         { label: 'Minimize to tray', click: () => { win.hide(); } },
    //         {
    //             label: 'Quit',
    //             click: () => {
    //                 app.needToExit = true;
    //                 if (win) {
    //                     win.close();
    //                 } else {
    //                     process.exit(0);
    //                 }
    //             }
    //         }
    //     ]);

    // tray = new Tray(trayIcon);
    // tray.setPressedImage(trayIconHide);
    // tray.setTitle(config.appName);
    // tray.setToolTip(config.appSlogan);
    // tray.setContextMenu(contextMenu);


    // tray.on('click', () => {
    //     if (!win.isFocused() && win.isVisible()) {
    //         win.focus();
    //     } else if (settings.get('tray_minimize', false)) {
    //         if (win.isVisible()) {
    //             win.hide();
    //         } else {
    //             win.show();
    //         }
    //     } else {
    //         if (win.isMinimized()) {
    //             win.restore();
    //             win.focus();
    //         } else {
    //             win.minimize();
    //         }
    //     }
    // });

    // win.on('show', () => {
    //     tray.setHighlightMode('always');
    //     tray.setImage(trayIcon);
    //     contextMenu = Menu.buildFromTemplate([
    //         { label: 'Minimize to tray', click: () => { win.hide(); } },
    //         {
    //             label: 'Quit',
    //             click: () => {
    //                 app.needToExit = true;
    //                 win.close();
    //             }
    //         }
    //     ]);
    //     tray.setContextMenu(contextMenu);
    //     tray.setToolTip(config.appSlogan);
    // });

    // win.on('hide', () => {
    //     tray.setHighlightMode('never');
    //     tray.setImage(trayIconHide);
    //     if (platform === 'darwin') return;

    //     contextMenu = Menu.buildFromTemplate([
    //         { label: 'Restore', click: () => { win.show(); } },
    //         {
    //             label: 'Quit',
    //             click: () => {
    //                 app.needToExit = true;
    //                 win.close();
    //             }
    //         }
    //     ]);
    //     tray.setContextMenu(contextMenu);
    // });

    // win.on('minimize', (event) => {
    //     if (settings.get('tray_minimize') && platform !== 'darwin') {
    //         event.preventDefault();
    //         win.hide();
    //     }
    // });

    win.on('closed', () => {
        win = null;
    });

    win.setMenu(null);
}



// // misc handler
// win.webContents.on('crashed', () => {
//     // todo: prompt to restart
//     log.debug('webcontent was crashed');
// });

// win.on('unresponsive', () => {
//     // todo: prompt to restart
//     log.debug('webcontent is unresponsive');
// });

app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})