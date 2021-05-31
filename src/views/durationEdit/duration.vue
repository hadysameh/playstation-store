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
      <p v-if="isDataUnSet" class="text-danger"> please choose the required times so the process can proceed</p>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import dbHandler from '../../views/viewsHelpers/dbHandler'
import {getDateTimeForNormalTime,addADayToDateTime,getTimefromDateTime} from '../viewsHelpers/dateHandler'
export default {
    data(){
        return {
            type:'limited',            
            from:null,
            to:null,
            db_handler:new dbHandler(),
            isDataUnSet:false,
            device_id:null
        }
    },
    mounted(){
        ipcRenderer.on('duration-data',(event,data)=>{
            // console.log(data)
            this.device_id=data.device_id
            this.from=getTimefromDateTime(data.from)
            if(data.to == 'open'){
                this.type='open'
            }
            else{
                this.to=getTimefromDateTime(data.to)
            }
        })
        
    },
    methods:{
        
        onEdit(){
            
            // let data={
            //     device_id:this.device_id,
            //     starts_from:getDateTimeForNormalTime(this.from),
            //     ends_at:this.type=='limited'?getDateTimeForNormalTime(this.to):null
            // }
            // console.log(data)
            // this.db_handler.editCurrentDuration(data).then(()=>{
            //     ipcRenderer.send('duration-edit-close',data);
            // })
            //=====================================================================================================================
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
                    
                    this.db_handler.editCurrentDuration(data).then(()=>{
                        
                        ipcRenderer.send('duration-edit-close',data);
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
                        ipcRenderer.send('duration-edit-close',dataSentToHomeWindow);
                    });
                }

            }
            
        }
    }

}
</script>

<style>

</style>