import {BrowserWindow} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
export default class windowHandler{
    constructor(pageScript,options={
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
      })
      {
        this.options=options;

        this.options.webPreferences={
          nodeIntegration:process.env.ELECTRON_NODE_INTEGRATION,
          contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        };
        this.pageScript=pageScript;
        this.window=null
    }

    async createWindow(){
        this.win = new BrowserWindow(this.options)
        
          if (process.env.WEBPACK_DEV_SERVER_URL+this.pageScript) {
            
            try{
              //error is here because the folder location is different than where it is at background.js
              await this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL+this.pageScript)
            }
            catch(e){
              
                console.log(e)
              
            }
            
            if (!process.env.IS_TEST) 
            {
              this.win.webContents.openDevTools()
            }
          } 
          else {
            try{
              createProtocol('app')
              this.win.loadURL('app://./'+this.pageScript)
            }
            catch(e){
              console.log(e)
            }
      }
    }

    sendEventData(eventName,data){
      this.win.webContents.send(eventName,data );
    }

    closeWindow(){
      this.win.close();
    }

}
