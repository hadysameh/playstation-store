<template>
  <div class='container d-flex flex-column justify-content-center align-items-center' style="width:200px">
      <table>
          <tbody>
              <tr>
                  <td>from : </td>
                  <td><input type="time" v-model="from"></td>
              </tr>
              <tr>
                <td>
                    type :
                </td>
                <td>
                    <select v-model="type" name="" id="" >
                        <option value="open">open</option>
                        <option value="limited">limited</option>
                    </select>
                </td>
                
              </tr>
              <tr v-if="type=='limited'">
                  <td>to :</td>
                  <td><input type="time" v-model="to"></td>
              </tr>
          </tbody>
      </table>
      
      <button class="btn btn-success" v-on:click='onEdit'>done</button>
      
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import dbHandler from '../../views/viewsHelpers/dbHandler'
import * as dateHandler from '../../views/viewsHelpers/dateHandler'
export default {
    data(){
        return {
            type:'limited',            
            from:null,
            to:null,
            db_handler:new dbHandler(),
            
            device_id:null
        }
    },
    mounted(){
        ipcRenderer.on('duration-data',(event,data)=>{
            // console.log(data)
            this.device_id=data.device_id
            this.from=dateHandler.getTimefromDateTime(data.from)
            if(data.to == 'open'){
                this.type='open'
            }
            else{
            this.to=dateHandler.getTimefromDateTime(data.to)
            }
        })
        
    },
    methods:{
        
        onEdit(){
            
            let data={
                device_id:this.device_id,
                starts_from:dateHandler.getDateTimeForNormalTime(this.from),
                ends_at:this.type=='limited'?dateHandler.getDateTimeForNormalTime(this.to):null
            }
            console.log(data)
            this.db_handler.editCurrentDuration(data).then(()=>{
                ipcRenderer.send('duration-edit-close',data);
            })
            
        }
    }

}
</script>

<style>

</style>