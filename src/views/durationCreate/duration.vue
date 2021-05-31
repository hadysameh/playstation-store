<template>
  <div class='container d-flex flex-column justify-content-center align-items-center' >
      <table>
          <tbody>
              <tr>
                  <td>from : </td>
                  <td><input v-model='from' type="time"></td>
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
                  <td><input type="time"  v-model='to'></td>
              </tr>
          </tbody>
      </table>
      
      <button class="btn btn-success" v-on:click="onStoreDuration" >done</button>
      
      <p v-if="isDataUnSet" class="text-danger"> please choose the required times so the process can proceed</p>
      
  </div>
</template>

<script>
import dbHandler from '../viewsHelpers/dbHandler'
import {getDateTimeForNormalTime,addADayToDateTime} from '../viewsHelpers/dateHandler'
import {ipcRenderer} from 'electron'
export default {
    data(){
        return {
            device_id:null,
            from:null,
            to:null,
            type:'limited',
            db_handler:new dbHandler(),
            isDataUnSet:false
           
        }
    },
    mounted(){
        ipcRenderer.on('duration-create-device-id',  (event, id)=> {
            
            this.device_id=id
            
        });
    },
    methods:{
        
        onStoreDuration(){
            if(this.type=='limited'){
                if(this.from==null||this.to==null){
                this.isDataUnSet=true;
                }
                else{
                    let starts_from = getDateTimeForNormalTime(this.from)
                    let ends_at = getDateTimeForNormalTime(this.to)

                    if(starts_from > ends_at){
                        ends_at = addADayToDateTime(getDateTimeForNormalTime(this.to))
                    }
                    
                    let data={
                        device_id:this.device_id,
                        starts_from:starts_from,
                        ends_at:ends_at,
                        
                    }
                    
                    this.db_handler.insertToDuration(data).then(()=>{
                        let dataSentToHomeWindow={
                            device_id:this.device_id,
                            from:getDateTimeForNormalTime(this.from),
                            to:getDateTimeForNormalTime(this.to)
                        }
                        ipcRenderer.send('duration-create-close',dataSentToHomeWindow);
                    }).catch(e=>console.log(e))
                }
            }
            else {
                if(this.from==null){
                    this.isDataUnSet=true;
                }
                else{
                    let data={
                        device_id:this.device_id,
                        starts_from:getDateTimeForNormalTime(this.from),
                        ends_at:null
                        }
                    this.db_handler.insertToDuration(data).then(()=>{
                        let dataSentToHomeWindow={
                            device_id:this.device_id,
                            from:getDateTimeForNormalTime(this.from),
                            to:'open'
                        }
                        ipcRenderer.send('duration-create-close',dataSentToHomeWindow);
                    });
                }

            }
        },
        
    },
    computed:{
        
    }
}
</script>

<style>

</style>