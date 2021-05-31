import {  BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

async function createWindow(pageLink,options=
      {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
  }) 
  {
    options.webPreferences={
      nodeIntegration:process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    };
    // Create the browser window.
    const win = new BrowserWindow(options)
  
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL+pageLink)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL('app://./'+pageLink+'.html')
    }

    return win
  }

  function getMainWindow(){
    let allWindows = BrowserWindow.getAllWindows();
    
    if(allWindows[allWindows.length-1]){
      return allWindows[allWindows.length-1];
    }    
  }

  export {
    createWindow,
    getMainWindow
  }