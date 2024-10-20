import dayjs from 'dayjs/esm/index.js'
import dayjsUTC from 'dayjs-plugin-utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const importPlugins = () => {
    dayjs.extend(dayjsUTC);
    var timezonePlugin = require('dayjs/plugin/timezone');
    dayjs.extend(timezonePlugin);
    var customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat);
}

export const now = () => {
    return dayjs();
}

// check valid database date
export const validDBdate = (date) => {

    if(
        !date || 
        !dayjs(date).isValid() ||
        date === '' || 
        date === '0000-00-00' || 
        date === '0000-00-00 00:00:00' ||
        date === '0000-00-00T00:00:00.000000Z'
    ){
        return false;
    }

    return true;
}

// from database to format
export const date = (date, hour = false, timezone = false) => {

    importPlugins();

    if(
        !date || 
        !dayjs(date).isValid() ||
        date === '' || 
        date === '0000-00-00' || 
        date === '0000-00-00 00:00:00' ||
        date === '0000-00-00T00:00:00.000000Z'
    ){
        return '';
    }
    
    var dateUTC = dayjs.utc(date);
   
    var format = '';

    // if only year YYYY
    var dateRegex = /^\d\d\d\d$/;   
    if(dateRegex.test(date)){
        return date;
    }
    else{
        // if year and month YYYY-MM
        dateRegex = /^\d\d\d\d-\d\d$/;   
        if(dateRegex.test(date)){
            format = "MM/YYYY";
        }
        else{
            format = "DD/MM/YYYY";
        }
    }

    if(hour){
        format = format+" HH:mm";
    }

    if(timezone){
        var timezone = dayjs.tz.guess();
        return dayjs(dateUTC).tz(timezone).format(format);
    }
    else{
        return dayjs(dateUTC).format(format);
    }
}

// from formatted to db
export const date2db = (date) => {

    importPlugins();

    if(!date || !dayjs(date,"DD/MM/YYYY").isValid()){
        return '';  
    }

    return dayjs(date,"DD/MM/YYYY").format('YYYY-MM-DD');
}

// format animals
export const formatAnimals = (t,items) => {

    var resultFormatted = [];

    if(items && items.length > 0){
                        
        items.map((item,i) => {

            var itemFormatted = formatAnimal(t,item);
          
            resultFormatted.push(itemFormatted);
        });
    }

    return resultFormatted;
}

export const formatAnimal = (t,item) => {

    var itemFormatted = {
        id: item?.id,
        code: item?.code ? item.code : item?.id,
        name: item?.name,
        status: item?.status?.name && item.status.name.length > 0 ? t('animals.record.Status.'+item.status.name) : '',
        sponsor: item?.sponsor?.name && item.sponsor.name.length > 0 ? t('animals.record.Sponsored.'+item.sponsor.name) : '',        
        type: item?.type?.name && item.type.name.length > 0 ? t('animals.record.Type.'+item.type.name) : '',
        breed: item.breed?.description && item.breed?.description.length > 0 ? item.breed.description : '',
        gender: item?.gender?.name && item.gender.name.length > 0 ? t('animals.record.Gender.'+item.gender.name) : '',
        size: item?.size?.name && item.size.name.length > 0 ? t('animals.record.Size.'+item.size.name) : '',
        age: item?.age?.name && item.age.name.length > 0 ? t('animals.record.Age.'+item.age.name) : '',
        weight: item?.weight,
        birthdate: date(item?.birthdate,false,false),
        deathdate: date(item?.deathdate,false,false),
        description: item?.description && item.description.length > 0 ? item.description : '',
        location: item?.location && item.location.length > 0 ? item.location : '',
        image: item?.image ? item.image : '',
        image_file : null,
        image2: item?.image2 ? item.image2 : '',
        image2_file : null,        
        video: item?.video ? item.video : '',    
        video2: item?.video2 ? item.video2 : '',
        person: item?.person ? item.person : null,
        person_name: item?.person?.name2 && item.person.name2.length > 0 ? item?.person?.name+' '+item?.person?.surname+' / '+item?.person?.name2+' '+item?.person?.surname2 : item?.person?.name && item.person.name.length > 0 ? item?.person?.name+' '+item?.person?.surname : null,
        // save the ids as well
        status_id: item?.status_id,
        sponsor_id: item?.sponsor_id,
        type_id: item?.type_id,
        breed_id: item?.breed_id,
        gender_id: item?.gender_id,
        size_id: item?.size_id,
        age_id: item?.age_id,
        person_id: item?.person_id
    };
  
    return itemFormatted;
}

// format animals
export const formatPeople = (t,items) => {

    var resultFormatted = [];

    if(items && items.length > 0){
                        
        items.map((item,i) => {

            var itemFormatted = formatPerson(t,item);
          
            resultFormatted.push(itemFormatted);
        });
    }

    return resultFormatted;
}

export const formatPerson = (t,item) => {

    var itemFormatted = {
        id: item?.id,
        name: item?.name,
        surname: item?.surname,
        dni: item?.dni,
        birthdate: date(item?.birthdate,false,false),
        email: item?.email,
        phone: item?.phone,
        address: item?.address,
        name2: item?.name2,
        surname2: item?.surname2,
        dni2: item?.dni2,
        birthdate2: date(item?.birthdate2,false,false),
        email2: item?.email2,
        phone2: item?.phone2,
        address2: item?.address2,
        description: item?.description,
        animals: item?.animals ? item.animals : null
    };
  
    return itemFormatted;
}


export const videoFormat = (link,type = 'youtube') => {

    //'https://www.youtube.com/watch?v=7fkQwAz-5go&a=3';
    var resul = link;

    if(link && link.length > 0){

        if(type === 'youtube'){

            var split = link.split('v=');

            if(split.length > 1){

                var string = split[1];
                var split2 = string.split('&');

                resul = split2[0];

                return 'https://www.youtube.com/embed/'+resul;
            }
            else{
                resul = split[0];
                return resul;
            }
        }
        else{
            return resul;
        }
    }
    else{
        return resul;
    }
}

////////////////////////////////////////
// not used
////////////////////////////////////////
/*
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

export const dateDiary = (t,date, hour = false) => {

    if(!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00'){
        return '';
    }

    var formatDay = "DD";
    var formatMonth = "MMMM";
    var formatYear = "YYYY";
    var formatHour = "HH:mm";
    var formatWeekday = 'dddd';

    //var utc = require('dayjs/plugin/utc');
    //dayjs.extend(utc);

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
*/