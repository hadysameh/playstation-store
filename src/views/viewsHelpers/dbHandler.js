'use strict';

import mysql from 'mysql2/promise' 

export default class dbHandler{

    constructor(){
        
    }
    async Connect(){
       let connection= await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'playstationstore',
            dateStrings: true
            });
        return connection;
    }

    getConnection(){
        return this.connection;
    }

    async insertToDuration(duration_data){
        let connection= await this.Connect()
        // console.log(connection)


        let query ="INSERT INTO `durations` ( `device_id`, `starts_from`, `ends_at`) VALUES ( '"+duration_data.device_id+"', '"+duration_data.starts_from+"', '"+duration_data.ends_at+"');"
        
        // console.log(query)
        await connection.query(query)
        // console.log(outcome_test)
        connection=null

    }

    async editCurrentDuration(duration_data){
        
        let connection= await this.Connect()

        let query = "UPDATE `durations` SET `starts_from` = '"+duration_data.starts_from+ "', `ends_at` = '"+ duration_data.ends_at +"' where `device_id` = " + duration_data.device_id +" ORDER BY id DESC LIMIT 1"
        // console.log(query)
        await connection.query(query)
        connection=null
    }

    async deleteDuration(duration_data){
        let connection= await this.Connect()

        let query = "delete from `durations` where `device_id` = "+duration_data.device_id+" ORDER BY ID DESC LIMIT 1"
        // console.log(query)
        await connection.query(query)
        connection=null
    }

    async getLastDurationForaDevice(device_id){

        let connection= await this.Connect()
        
        let query = "SELECT * FROM `durations` where `device_id` = " + device_id + " ORDER BY ID DESC LIMIT 1"
        
        let result = await connection.query(query)
        
        // console.log([query,result])
        connection=null

        return result
    }
    
    async getDevices(){
        let connection= await this.Connect()
        // console.log(connection)
        var devices = await connection.query('SELECT * FROM devices');

        connection=null
        return devices;
    }

    async getDeviceName(id){
        let connection= await this.Connect()
        let query = "select `name` from `devices` where id = "+id
        var deviceNAme = await connection.query(query);
        connection=null
        return deviceNAme;
    }

    async getDeviceRecords(id,pageNumber){
        // console.log([id,typeof(pageNumber)])
        let connection= await this.Connect()
        
        let query="select * from durations INNER JOIN devices on durations.device_id = devices.id where `device_id` = "+id+" ORDER BY durations.id DESC LIMIT 10 OFFSET "+pageNumber*10
        // console.log(query)
        var devicesRecords = await connection.query(query);
        connection=null
        return devicesRecords;
    }

    async getDevicesRecords(pageNumber){
        
        let connection= await this.Connect()
        
        let query="select * from durations INNER JOIN devices on durations.device_id = devices.id ORDER BY durations.id DESC LIMIT 10 OFFSET "+pageNumber*10
        // console.log(query)
        var devicesRecords = await connection.query(query);
        connection=null
        return devicesRecords;
    }
    

    
}
// export default new dbHandler()
