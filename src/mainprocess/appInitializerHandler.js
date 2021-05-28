'use strict'

import { app, protocol, BrowserWindow , ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import windowsHandler from './windowsHandler.js'



export default function(){
    protocol.registerSchemesAsPrivileged([
        { scheme: 'app', privileges: { secure: true, standard: true } }
      ])
      
      // Quit when all windows are closed.
      app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        console.log('app will be closed')
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })
      
      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        
        if (BrowserWindow.getAllWindows().length === 0){
          //  createWindow()
           let winHandler = new windowsHandler('index');
           winHandler.createWindow();
          }
      })
      
      // This method will be called when Electron has finished
      // initialization and is ready to create browser windows.
      // Some APIs can only be used after this event occurs.
      app.on('ready', async () => {
        if (isDevelopment && !process.env.IS_TEST) 
        {
          // Install Vue Devtools
          try {
            await installExtension(VUEJS_DEVTOOLS)
          } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
          }
        }
          let winHandler = new windowsHandler('index');
          // winHandler.win.webContents.openDevTools();
          winHandler.createWindow();
      })
      
      // Exit cleanly on request from parent process in development mode.
      if (isDevelopment) {
        if (process.platform === 'win32') {
          process.on('message', (data) => {
            if (data === 'graceful-exit') {
              app.quit()
            }
          })
        } else {
          process.on('SIGTERM', () => {
            app.quit()
          })
        }
      }
}