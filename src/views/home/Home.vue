<template>
  <div class="container mt-3">
    <table class="table  table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">rent settings</th>
      <th scope="col">device status</th>
      <th scope="col">rent_duration_status</th>
      <th scope="col">records</th>
    </tr>
  </thead>
  <tbody v-if="devices">
    <row v-for="(device,i) in devices" :key="i" v-bind:device_id="device.id" v-bind:device_name="device.name" v-bind:row_id="device.id"></row>
    
    
  </tbody>
</table>
<a href="#" v-on:click="showDevicesRecords">show all records</a>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import row from '../../components/home/row'
import dbHandler from '../viewsHelpers/dbHandler'
// import mysql from 'mysql2/promise'
export default {
  name: 'Home',
  data(){
    return {
      db_handler:new dbHandler(),
      devices:null,
      
    }
  },
  mounted(){
  
   
  this.setDevices()
    
   
  },
  components: {
     row
  },
  methods:{
     setDevices(){
      //  let response;
       this.db_handler.getDevices().then(d=>{
         this.devices=d[0]
       });
      },
      showDevicesRecords(){
        ipcRenderer.send('devices-records')
      }

  }
}
</script>
