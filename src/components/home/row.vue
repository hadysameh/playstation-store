<template>
  <tr>
      <td>
          {{device_name}}
      </td>
      <td>
          <span  v-if="isRented">
              
              <del>rent</del>
          </span>
          <a href="#" v-on:click.prevent='onOpenDurationCreate(device_id)' v-else>
              rent
          </a>
          
      </td>
      <td>
          <span class="text-danger" v-if="isRented"> taken</span>
          <span class="text-success" v-else> available</span>
      </td>
      <td>
          <rentingtimestatus v-bind:isRented="isRented" v-bind:from="from" v-bind:to="to"  v-bind:display_from="display_from" v-bind:display_to="display_to" v-bind:device_id="device_id">

          </rentingtimestatus>
      </td>
      <td>
          <a href="#" v-on:click="showDeviceRecords">
              show
          </a>
      </td>
  </tr>
</template>

<script>
import {ipcRenderer} from 'electron'

import rentingtimestatus from './rentingtimestatus/rentingtimestatus'
import dbHandler from '../../views/viewsHelpers/dbHandler'
import * as dateHandler from '../../views/viewsHelpers/dateHandler'
export default {
    props:['device_id','device_name'],
    components:{
        rentingtimestatus
    },
    data(){
        return{
            isRented:false,
            from:null,
            to:null,
            db_handler:new dbHandler(),
            display_from:null,
            display_to:null,
            time_from:null,
            time_to:null
        }
    },
    mounted(){
        
        
        this.handelEvents()
        this.adjustTheDeviceIfRented()
        this.alwaysCheckOnDurations()
    },
    methods:{
        onOpenDurationCreate(id){
            ipcRenderer.send('duration-create',id);
        },
        
        adjustTheDeviceIfRented(){
            this.db_handler.getLastDurationForaDevice(this.device_id).then(data =>{
                let nowDateTime=dateHandler.getDateTime()
                let sqlRowData = data[0][0]
                // console.log(sqlRowData)
                if(sqlRowData){
                    if(sqlRowData.starts_from < nowDateTime && sqlRowData.ends_at > nowDateTime ){
                        this.isRented=true
                        this.from=sqlRowData.starts_from
                        this.to=sqlRowData.ends_at

                        this.time_from=this.from.split(' ')[1]
                        this.time_to=this.to.split(' ')[1]?this.to.split(' ')[1]:null
            
                        this.display_from = dateHandler.tweleveHoursModeDisplay(this.time_from)
                        this.display_to = dateHandler.tweleveHoursModeDisplay(this.time_to)
                    }
                    else if(sqlRowData.starts_from < nowDateTime && sqlRowData.ends_at == '0000-00-00 00:00:00' ){
                        this.isRented=true
                        this.from=sqlRowData.starts_from
                        this.to='open'

                        this.time_from=this.from.split(' ')[1]

                        this.display_from = dateHandler.tweleveHoursModeDisplay(this.time_from)
                        this.display_to = 'open'
                    }
                    else{
                        this.isRented=false
                    }
                }
            })
            
        },
        makeTHeDeviceAvailable(){
            this.isRented=false
            this.from=null
            this.to=null
            this.display_from=null
            this.display_to=null
        },
        showDeviceRecords(){
            // console.log('showDeviceRecords')
            let data = {
                device_id:this.device_id,

            }
            ipcRenderer.send('device-records',data)
        },
        handelEvents(){
            ipcRenderer.on(`device_number_${this.device_id}_is_taken`,(event,data)=>{            
                // console.log(data)
                this.isRented=true
                this.from=data.from
                this.to=data.to
                // this.display_from = this.from.split(' ')[1]
                // this.display_to = this.to.split(' ')[1]?this.to.split(' ')[1]:this.to
                this.time_from = this.from.split(' ')[1] 
                this.time_to = this.to.split(' ')[1] ? this.to.split(' ')[1] : null

                this.display_from = dateHandler.tweleveHoursModeDisplay(this.time_from)
                this.display_to = this.to.split(' ')[1]?dateHandler.tweleveHoursModeDisplay(this.to.split(' ')[1]):this.to 
            })


            ipcRenderer.on(`device_number_${this.device_id}_is_edited`,(event,data)=>{
                // console.log(`device_number_${this.device_id}_is_edited`)
            this.adjustTheDeviceIfRented()
            })

            ipcRenderer.on(`device_number_${this.device_id}_is_available`,(event,data)=>{
                // console.log(data)
                this.makeTHeDeviceAvailable()
            })
        },
        //this won't work because of the many connections to mysql
        alwaysCheckOnDurations(){
            setInterval(()=>{
                this.adjustTheDeviceIfRented();
                // console.log('done')
            }, 5000)
        }
        
    }
    
}
</script>

<style>

</style>