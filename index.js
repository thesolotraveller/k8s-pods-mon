const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load localhost url of react app
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow) 