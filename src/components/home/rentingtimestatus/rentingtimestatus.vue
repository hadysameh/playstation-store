<template>
  <div class="d-flex flex-column">
      <div class="d-flex flex-row">
        <div class="mr-2">
          <span>from:</span>
          <span v-if="display_from&&isRented">{{display_from}}</span>
        </div>

        <div class="ml-2">
          <span>to:</span>
          <span v-if="display_to&&isRented">{{display_to}}</span>
        </div>
      </div>
      
      <div class="d-flex flex-row">

          <button class="btn btn-sm mr-2 my-1 btn-primary" v-on:click="onRentEdit" v-if="isRented"> edit </button>
          <span class="mr-2 my-1" v-else>----</span>

          <button class="btn btn-sm mr-2 my-1 btn-danger" v-if="isRented" v-on:click="onCancel"> cancel </button>
          <span class="mr-2 my-1" v-else>----</span>

      </div>
      <div>

          <button class="btn btn-sm mr-2 my-1 btn-success" v-if="isRented" v-on:click="onEndRenting"> end renting </button>
          <span class="mr-2 my-1" v-else>----</span>
      </div>
  </div>

</template>

<script>
import {ipcRenderer} from 'electron'
import dbHandler from '../../../views/viewsHelpers/dbHandler'
import * as dateHandler from '../../../views/viewsHelpers/dateHandler'
export default {
  props:['isRented','from','to','device_id','display_from','display_to'],
  data(){
    return{
      db_handler:new dbHandler(),
    }
  },
  mounted(){
    // console.log(this.device_id)
  },
  methods:{
    onRentEdit(){
      let data = {
        from:this.from,
        to:this.to,
        device_id:this.device_id,
        
      }
      ipcRenderer.send('duration-edit',data);
    },
    onEndRenting(){
      //will edit 'to' to the time that is being ended
      let data = {
        device_id : this.device_id,
        starts_from : this.from,
        ends_at : dateHandler.getDateTime()
      }
      this.db_handler.editCurrentDuration(data)
      //after the row in db is edited time to open the new window
      data.display_from=this.display_from
      data.display_to=this.display_to
      ipcRenderer.send('duration-end',data);
    },
    onCancel(){
      
      let data={
        device_id:this.device_id
      }

      this.db_handler.deleteDuration(data).then(()=>{
        ipcRenderer.send('cancel-device-rent',data);
      })

      
    }
  }

}
</script>

<style>

</style>