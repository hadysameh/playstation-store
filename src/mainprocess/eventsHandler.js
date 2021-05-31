import {ipcMain } from 'electron'

import {createWindow,getMainWindow} from './windowModule'

export default  function(){
  
  // function getMainWindow(){
  //   let allWindows = BrowserWindow.getAllWindows();
    
  //   if(allWindows[allWindows.length-1]){
  //     return allWindows[allWindows.length-1];
  //   }    
  // }
  var durationCreateWindow= null;
  var durationEndWindow= null;
  var durationEditWindow =null;
  var deviceRecordsWindow =null;
  var devicesRecordsWindow =null;

  ipcMain.on('duration-create',async (event,id)=>{
    // if(durationCreateWindow == null){
    // }      
    
    createWindow('durationcreate',{height:300,width:400})
    .then(win=>{
      durationCreateWindow = win;
      durationCreateWindow.webContents.send('duration-create-device-id',id  );      
    })
    
  })

  ipcMain.on('duration-create-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    
    if(MainWindow)
    {      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_taken` ,data);
    }
    durationCreateWindow.close();
    durationCreateWindow=null
  })

  ipcMain.on('duration-end',async(event,data)=>{

    // if(durationEndWindow==null){}    
    createWindow('durationend',{height:300,width:500})
      .then(win=>{
        durationEndWindow= win;
        durationEndWindow.webContents.send('duration-data',data  ); 
        
      })
  })

  ipcMain.on('duration-end-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    // let allWindows = BrowserWindow.getAllWindows();
    
    if(MainWindow){
      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_available` ,data);
    }
    durationEndWindow.close();
    durationEndWindow=null
  })

  ipcMain.on('cancel-device-rent',(event,data)=>{
    
    let MainWindow = getMainWindow()
    if(MainWindow){
      MainWindow.webContents.send(`device_number_${data.device_id}_is_available` ,data);
    }
    
  })

  ipcMain.on('duration-edit',async(event,data)=>{

    // if(durationEditWindow==null){ }
    
    createWindow('durationedit',{height:300,width:500})
    .then(win=>{
      durationEditWindow= win;
      durationEditWindow.webContents.send('duration-data',data  );      
    })
       
  })

  ipcMain.on('duration-edit-close',(event,data)=>{
    
    let MainWindow = getMainWindow()
    // let allWindows = BrowserWindow.getAllWindows();
    
    if(MainWindow){      
      MainWindow.webContents.send(`device_number_${data.device_id}_is_edited` ,data);
    }
    durationEditWindow.close();
    durationEditWindow=null
  })

  ipcMain.on('device-records',async(event,data)=>{

    // if(deviceRecordsWindow == null){

    // }
    createWindow('devicerecord')
      .then(win=>{
        deviceRecordsWindow= win
        deviceRecordsWindow.webContents.send('device-records-data',data  );
      })
      
      
  })

  ipcMain.on('devices-records',async(event,data)=>{

    if(devicesRecordsWindow==null){}
    createWindow('devicesrecord').then(win=>{
      // console.log(['win is',win])
      devicesRecordsWindow= win

      // console.log(['devicesRecordsWindow is ',devicesRecordsWindow])
    })
    
  })

}



  