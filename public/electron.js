const path = require('path');

const { app, BrowserWindow,Menu,Notification } = require('electron');
const isDev = require('electron-is-dev');
const {ipcMain} = require('electron')

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname,'preload.js')
    },
  });

  const template = [
    {
      label: 'Paras',
      submenu: [
        {
          label: 'About',
          click: () => {
            new Notification({
              title: 'About',
              body: 'Paras is a simple app to manage your tasks.',
              silent: false,
              icon: path.join(__dirname, 'assets/icons/icon.png')
            }).show();
          }
        }]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);






  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}


ipcMain.on('check',(event,arg) =>{
  new Notification({'title':'Hello','body':'World'}).show()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});