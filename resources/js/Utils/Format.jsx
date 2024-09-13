import dayjs from 'dayjs/esm/index.js'
import dayjsUTC from 'dayjs-plugin-utc';

export const importPlugins = () => {
    dayjs.extend(dayjsUTC);
    var timezonePlugin = require('dayjs/plugin/timezone');
    dayjs.extend(timezonePlugin);
}

export const now = () => {
    return dayjs();
}

export const dateToDatePicker = (date) => { 
    return dayjs(date);
}

export const timeToTimePicker = (time) => { 
    const split = time.split(':');
    const valueFrom = dayjs().hour(split[0]).minute(split[1]);
    return valueFrom;
}

export const isBeforeDate = (date,date2) => {
    return dayjs(date).isBefore(dayjs(date2));
}

export const isEqualAfterDate = (date,date2) => {
    return !dayjs(date).isBefore(dayjs(date2));
}

export const getDatesFromDatepicker = (value) => {

    var returnDate = value;

    if(value?.$d && dayjs(value.$d).isValid()){
        returnDate = value;
        var dayjsvalue = dayjs(value.$d);        
    }
    else{            
        // today
        var dayjsvalue = dayjs();
        returnDate = dayjsvalue;
    }

    var dateFormatted = dayjsvalue.format('YYYY-MM-DD');

    return [returnDate,dateFormatted];
}

export const getTimesFromTimepicker = (value) => {

    var returnTime = value;

    if(value?.$d && dayjs(value.$d).isValid()){
        returnTime = value;
        var dayjsvalue = dayjs(value.$d);
    }
    else{
        // now
        var dayjsvalue = dayjs();
        returnDate = dayjsvalue;
    }    

    var timeFormatted = dayjsvalue.format('HH:mm'); 
    
    return [returnTime,timeFormatted];
}

export const offset = () => {
    
    importPlugins();

    // Europe/Madrid
    var timezone = dayjs.tz.guess();

    // +01:00
    //var timezoneNumer = dayjs().format('Z');

    return timezone;
}

export const date = (date, hour = true, timezone = true) => {

    if(
        !date || 
        date === '' || 
        date === '0000-00-00' || 
        date === '0000-00-00 00:00:00' ||
        date === '0000-00-00T00:00:00.000000Z'
    ){
        return '';
    }

    var format = "DD-MM-YYYY";
    if(hour){
        format = "DD-MM-YYYY HH:mm";
    }

    importPlugins();
    
    var dateUTC = dayjs.utc(date);

    if(timezone){
        var timezone = dayjs.tz.guess();
        return dayjs(dateUTC).tz(timezone).format(format);
    }
    else{
        return dayjs(dateUTC).format(format);
    }

    /*
    const { t } = useTranslation('global')
    const split = date.split('/')
    const months = [
        t("Calendar-January"),
        t("Calendar-February"),
        t("Calendar-March"),
        t("Calendar-April"),
        t("Calendar-May"),
        t("Calendar-June"),
        t("Calendar-July"),
        t("Calendar-August"),
        t("Calendar-September"),
        t("Calendar-October"),
        t("Calendar-November"),
        t("Calendar-December")
    ]
    return `${split[0]} ${months[split[1] - 1].substring(0, 3)}`
    */
}

export const dateDiary = (t,date, hour = false) => {

    if(!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00'){
        return '';
    }

    var formatDay = "DD";
    var formatMonth = "MMMM";
    var formatYear = "YYYY";
    var formatHour = "HH:mm";
    var formatWeekday = 'dddd';

    /*
    var utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);
    */
    dayjs.extend(dayjsUTC);

    var dateUTC = dayjs.utc(date);

    var final = dayjs(dateUTC);

    var result = final.format(formatDay)+' '+t('Calendar-'+final.format(formatMonth))+' '+final.format(formatYear);

    if(hour){
        result = result+' '+final.format(formatHour);
    }

    result = result+', '+t('Calendar-'+final.format(formatWeekday));
    
    return result;
}

export const dateRemoveHour = (date) => {

    var result = date;

    var split = date.split(' ');

    if(split.length === 2){
        result = split[0];
    }
    else{
        //'0000-00-00T00:00:00.000000Z'
        split = date.split('T');

        if(split.length === 2){
            result = split[0];
        }
    }

    return result;
}

export const dateDatabaseWithTimezoneToDateDatabase = (date) => {

    //2024-03-25T00:00:00.000000Z

    var result = date;

    var split = date.split('T');

    if(split.length === 2){
        result = split[0];
    }

    return result;
}

export const hourRemoveSeconds = (hour) => {

    var result = hour;

    var format = "HH:mm:ss";
    var format2 = "HH:mm";

    if(hour && hour.length > 0){
    //if(dayjs(hour,format).isValid() || dayjs(hour,format2).isValid()){

        var split = hour.split(':');
        result = split[0]+':'+split[1];
    }

    return result;
}

export const getDateWithHourWithOffset = (date,offset = null) => {

    if(!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00'){
        return '';
    }

    var result = date;
    var format = "YYYY-MM-DD HH:mm";
    var format2 = "YYYY-MM-DD HH:mm:ss";

    if(dayjs(date,format).isValid() || dayjs(date,format2).isValid()){

        importPlugins();

        if(!offset || offset.length === 0){
            var timezone = dayjs.tz.guess();
        }
        else{
            var timezone = offset;
        }

        var dateUTC = dayjs.utc(date);

        var final = dayjs(dateUTC).tz(timezone);

        result = final.format(format);
    }
    
    return result;
}

export const dateGetHour = (date) => {

    var result = date;

    var format = "DD-MM-YYYY HH:mm";

    if(dayjs(date,format).isValid()){
        
        var split = date.split(' ');

        if(split.length === 2){
            
            var newSplit = split[1];
            split = newSplit.split(':');

            if(split.length >= 2){
                result = split[0]+':'+split[1];
            }
        }
    }
    else{
        //'0000-00-00T00:00:00.000000Z'
        var split = date.split('T');

        if(split.length === 2){
            result = split[1];

            split = result.split(':');

            if(split.length >= 2){
                result = split[0]+':'+split[1];
            }
        }
    }

    return result;
}

export const dateWeekday = (date) => {

    if(!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00'){
        return '';
    }

    importPlugins();

    var timezone = dayjs.tz.guess();

    var dateUTC = dayjs.utc(date);
    
    return dayjs(dateUTC).tz(timezone).format('dddd'); 
}

export const points = (points, symbol = false) => {

    if(!points){
        points = 0;
    }
    
    var value = new Intl.NumberFormat('de-DE').format(points);

    if(symbol){
        /*
        return (
            //<>{value}<span class='text-highlighted font-bold'>n;</span></>
        )
        */
        return value;
    }
    else{
        return value;
    }
}

export const price = (price, currency = true, decimals = 2) => {

    var result = 0;

    if(price){
        result = price;
    }

    result = parseFloat(result);
    result = result.toFixed(decimals);

    if(currency){
        result = result + '€';
    }

    return result;
}

export const percentage = (price, symbol = true, decimals = 2) => {

    var result = 0;

    if(price){
        result = price;
    }

    result = parseFloat(result);
    result = result.toFixed(decimals);
    result = result.replace('.00','');

    if(symbol){
        result = result + '%';
    }

    return result;
}

export const link = (text) => {

    var result = text;

    if(!text.startsWith('https://') && !text.startsWith('http://')){
        result = 'https://'+encodeURIComponent(result);
    }

    return result;
}

// event utc, add offset
/*
export const eventAddOffset = (e) => {

    var date = e?.date;
    var date_utc = e?.date; 

    var hour = null;
    
    if(e?.hour && e?.hour.length > 0){
        var dateOffset = getDateWithHourWithOffset(e?.date+' '+e?.hour,e?.offset);
        var split = dateOffset.split(' ');
        date = split[0];
        hour = split[1];
    }

    var hour_to = null;
    if(
        (e?.hour_to && e?.hour_to.length > 0) && 
        (e?.date !== e?.date_to || e?.hour_to !== e?.hour)
    ){
        var dateToOffset = getDateWithHourWithOffset(e?.date_to+' '+e?.hour_to,e?.offset);
        var split = dateToOffset.split(' ');
        hour_to = split[1];
    }

    var format = {
        date: date,
        hour: hour,
        hour_to: hour_to,
        date_utc: e?.date,                
        hour_utc: e?.hour,
        date_to_utc: e?.date_to,
        hour_to_utc: e?.hour_to,
        event: e
    };

    return format;
}

export const calendar = (item,user,role) => {

    var startTime = item?.date_utc;
    var endHour = null;
    if(item?.hour_utc && item?.hour_utc.length > 0){                                        
        startTime = startTime+'T'+item.hour_utc;
        endHour = item.hour_utc;
    }  
    else{
        endHour = '23:59:59';
        startTime = startTime+'T00:00:00';
    }  
    startTime = startTime+'+00:00';

    var endTime = item?.date_to_utc;
    if(item?.hour_to_utc && item?.hour_to_utc.length > 0){
        endTime = endTime+'T'+item.hour_to_utc;
    }
    else{
        endTime = endTime+'T'+endHour;
    }
    endTime = endTime+'+00:00';

    var attendee = '';
    if(role === 'requester'){
        attendee = user?.requester?.name+' '+user?.requester?.surname+' <'+user?.email_notifications+'>'
    }
    else{
        attendee = user?.doer?.name+' '+user?.doer?.surname+' <'+user?.email_notifications+'>'
    }

    var eventCalendar = {
        title: item?.event?.title,
        description: item?.event?.description,
        startTime: startTime,
        endTime: endTime,                                        
        attendees: [
            attendee
        ]
    }

    return eventCalendar;
}
*/
