<template>
  <div class='container d-flex flex-column justify-content-center align-items-center' style="width:200px">
      <p>device : {{deviceName}}</p>
      <p>total duration is <span class="text-success">from:{{display_from}} to:{{display_to}}</span> </p>
      
      <button class="btn btn-success" v-on:click="onCloseWindow">done</button>
      
  </div>
</template>

<script>
import dbHandler from '../viewsHelpers/dbHandler'
import {ipcRenderer} from 'electron'
export default {
    data(){
        return {
            device_id:null,
            from:null,
            to:null,
            display_from:null,
            display_to:null,
            deviceName:'',
            db_handler:new dbHandler(),
        }
    },
    mounted(){
        ipcRenderer.on('duration-data',  (event, data)=> {
            
            this.device_id=data.device_id
            this.from=data.starts_from
            this.to=data.ends_at
            // console.log(this.to)
            this.display_from=data.display_from
            this.display_to=data.display_to
            this.db_handler.getDeviceName(data.device_id).then(data=>{
                // console.log(data[0][0].name)
                this.deviceName = data[0][0].name
            })
        });
    },
    methods:{
        onCloseWindow(){
            let dataSentToHomeWindow = {
                device_id:this.device_id           
            }
            ipcRenderer.send('duration-end-close',dataSentToHomeWindow);
        }
    }

}
</script>

<style>

</style>