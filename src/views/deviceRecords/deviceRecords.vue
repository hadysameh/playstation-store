<template>
    <div class='container d-flex flex-column justify-content-center align-items-center'>
        <table class="table  table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">from</th>
                <th scope="col">to</th>                
              </tr>
            </thead>
        <tbody>
            <tr v-for="(record,i) in records" :key="i" >
                <td>{{record.name}}</td>
                <td>{{record.starts_from}}</td>
                <td>{{record.ends_at}}</td>
            </tr>
        </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" v-on:click="getPreviousPage">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#" v-on:click="getNextPage">Next</a></li>
            </ul>
        </nav>
      
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import dbHandler from '../viewsHelpers/dbHandler'
export default {
    data(){
        return {
            records:null,
            db_handler:new dbHandler(),
            device_id:null,
            pageNumber:1
        }
    },
    mounted(){
        ipcRenderer.on('device-records-data',(event,data)=>{
            this.device_id=data.device_id
            this.getDevicesRecords()
        })
    },
    methods:{
        getDevicesRecords(){
            
            this.db_handler.getDeviceRecords(this.device_id,this.pageNumber-1).then(data=>{
                // console.log(data[0])
                this.records=data[0]
            })
        },
        getPreviousPage(){
            if(this.pageNumber>1){
                this.pageNumber--
            }else{
                return 
            }
            
            this.getDevicesRecords()
        },
        getNextPage(){
            this.pageNumber++
            this.getDevicesRecords()
        }

    }

}
</script>

<style>

</style>