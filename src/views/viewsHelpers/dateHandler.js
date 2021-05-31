
function getDateTime(){
    var date = new Date()
    date.setHours(date.getHours() + 2);
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

function getDateTimeForNormalTime(time){
    let nowDateTime = getDateTime()
    let date_timeArr = nowDateTime.split(" ")
    let timeStr = date_timeArr[1]
    let timeArr = timeStr.split(':')

    timeArr[0] = time.split(':')[0]
    timeArr[1] = time.split(':')[1]
    timeStr = timeArr.join(':') 
    let date_timeStr = date_timeArr[0]+' '+timeStr
    console.log(date_timeStr)
    return date_timeStr
}
//works just fine
function addADayToDateTime(dateTime){
    // let todayDate = new Date()
    // let tomorrow_dateTime = dateTime({date: todayDate.getDate()+1});

    // let tomorrow_dateStr = tomorrow_dateTime.split(" ")[0]
    // let date_timeArr = dateTime.split(' ')
    // let dateStr = date_timeArr[0]
    // let dateArr = dateStr.split('-')
    // let day = dateArr[2]
    // day = Number(day)+1
    // dateArr[2]=day
    // dateStr=dateArr.join('-')
    // date_timeArr[0]= dateStr
    // let date_timeStr = date_timeArr.join(' ')
    // return date_timeStr

    let thedate = new Date(Date.parse(dateTime));
    thedate.setDate(thedate.getDate() +1)
    // return thedate.toISOString().slice(0, 19).replace('T', ' ');
    return new Date(thedate).toISOString().slice(0, 19).replace('T', ' ');
    
}

function tweleveHoursModeDisplay(time){
    if(!time) return null;
    let time_arr = time.split(':')
    let hours = Number(time_arr[0])
    let time_str = ''

    if(hours > 12){
        time_arr[0] = hours % 12
        time_str =`${time_arr[0]}:${time_arr[1]} PM`
    }else{
        time_str =`${time_arr[0]}:${time_arr[1]} AM`
    }
    
    
    return time_str
}

function getTimefromDateTime(time){
    let WholeTime = time.split(' ')[1] 
    let time_arr = WholeTime.split(':')
    let timeInHoursAndMinutes= `${time_arr[0]}:${time_arr[1]}`
    return timeInHoursAndMinutes
}

module.exports={
    getDateTime,
    getDateTimeForNormalTime,
    addADayToDateTime,
    tweleveHoursModeDisplay,
    getTimefromDateTime
}
