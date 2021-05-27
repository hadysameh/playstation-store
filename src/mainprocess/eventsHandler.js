import {ipcMain,BrowserWindow } from 'electron'
import windowsHandler from './windowsHandler.js'

export default  function(){
  
  function getMainWindow(){
    let allWindows = BrowserWindow.getAllWindows();
    
    if(allWindows[allWindows.length-1]){
      return allWindows[allWindows.length-1];
    }    
  }


  var durationCreateWindowHandler= null;
  var durationEndWindowHandler= null;
  var durationEditWindowHandler =null;
  var deviceRecordsWindowHandler =null;
  var devicesRecordsWindowHandler =null;

  ipcMain.on('duration-create',async (event,id)=>{
    if(durationCreateWindowHandler == null){
      durationCreateWindowHandler= new windowsHandler('durationcreate',{
        height:300,
        width:400
      });
      await durationCreateWindowHandler.createWindow().then(()=>{
        durationCreateWindowHandler.sendEventData('duration-create-device-id',id );
      })  
    }
      
  })

  ipcMain.on('duration-create-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    // let allWindows = BrowserWindow.getAllWindows();
    
    if(MainWindow){
      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_taken` ,data);
    }
    durationCreateWindowHandler.closeWindow();
  })

  ipcMain.on('duration-end',async(event,data)=>{

    if(durationEndWindowHandler==null){
      durationEndWindowHandler= new windowsHandler('durationend',{
        height:300,
        width:500
      });
  
      await durationEndWindowHandler.createWindow().then(()=>{
        durationEndWindowHandler.sendEventData('duration-data',data );
      })    
    }
    
  })

  ipcMain.on('duration-end-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    // let allWindows = BrowserWindow.getAllWindows();
    
    if(MainWindow){
      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_available` ,data);
    }
    durationEndWindowHandler.closeWindow();
  })

  ipcMain.on('cancel-device-rent',(event,data)=>{
    
    let MainWindow = getMainWindow()
    if(MainWindow){
      MainWindow.webContents.send(`device_number_${data.device_id}_is_available` ,data);
    }
    
  })

  ipcMain.on('duration-edit',async(event,data)=>{

    if(durationEditWindowHandler==null){
      durationEditWindowHandler= new windowsHandler('durationedit',{
        height:300,
        width:500
      });
  
      await durationEditWindowHandler.createWindow().then(()=>{
        durationEditWindowHandler.sendEventData('duration-data',data );
      }) 
    }
       
  })

  ipcMain.on('duration-edit-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    // let allWindows = BrowserWindow.getAllWindows();
    
    if(MainWindow){      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_edited` ,data);
    }
    durationEditWindowHandler.closeWindow();
  })

  ipcMain.on('device-records',async(event,data)=>{

    if(deviceRecordsWindowHandler==null){
      deviceRecordsWindowHandler= new windowsHandler('devicerecord');

      await deviceRecordsWindowHandler.createWindow().then(()=>{
        deviceRecordsWindowHandler.sendEventData('device-records-data',data );
      })  
    }
      
  })

  ipcMain.on('devices-records',async(event,data)=>{

    if(devicesRecordsWindowHandler==null){
      devicesRecordsWindowHandler= new windowsHandler('devicesrecord');

      await devicesRecordsWindowHandler.createWindow().then(()=>{
        // deviceRecordsWindowHandler.sendEventData('device-records-data',data );
      })    
    }
    
  })

}



  