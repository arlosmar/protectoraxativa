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

export const datesDif = (date1,date2,unit='seconds') => {

    if(dayjs(date1).isValid() && dayjs(date2).isValid()){
        const date1js = dayjs(date1);
        const date2js = dayjs(date2);
        return date2js.diff(date1js,unit);
    }
    else{
        return false;
    }
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

// get year
export const dateYear = (date) => {

    importPlugins();

    var result = '';

    if(
        !date || 
        (
            !dayjs(date,"YYYY-MM-DD HH:mm:ss").isValid() &&
            !dayjs(date,"YYYY-MM-DD").isValid() &&
            !dayjs(date,"DD/MM/YYYY HH:mm:ss").isValid() &&
            !dayjs(date,"DD/MM/YYYY").isValid() &&
            !dayjs(date,"DD-MM-YYYY HH:mm:ss").isValid() &&
            !dayjs(date,"DD-MM-YYYY").isValid()
        )
    ){
        result = '';
    }
    else{
        if(
            dayjs(date,"YYYY-MM-DD HH:mm:ss").isValid() ||
            dayjs(date,"YYYY-MM-DD").isValid()
        ){
            var split = date.split('-');
            result = split[0];
        }
        else{
            if(
                dayjs(date,"DD/MM/YYYY HH:mm:ss").isValid() ||
                dayjs(date,"DD/MM/YYYY").isValid()
            ){
                var split = date.split('/');
                var string = split[2];
                var split2 = string.split(' ');
                result = split2[0];
            }
            else{
                var split = date.split('-');
                var string = split[2];
                var split2 = string.split(' ');
                result = split2[0];
            }
        }
    }

    return result;
}

// get string with birthdate year / deathdate year
export const yearsFormatted = (year1,year2) => {

    var result = '';

    if(
        (year1 && year1.length > 0) ||
        (year2 && year2.length > 0)
    ){

        if(year1 && year1.length > 0){
            result = year1;
        }
        else{
            result = '?';
        }

        if(year2 && year2.length > 0){
            result = result + ' - ' + year2;
        }
        else{
            result = result + ' - ?';
        }
    }
    else{
        result = '-';
    }

    return result;
}

// from database to format
//import { date } from "@/Utils/Format"; 
// date()

// import * as format from "@/Utils/Format";
// format.date()

// db date to date
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

// db date utc
export const dateWithOffsetToDbDate = (date, formatInitial = 'DD/MM/YYYY HH:mm:ss') => {

    importPlugins();

    if(
        !date || 
        !dayjs(date).isValid() ||
        date === ''
    ){
        return '';
    }
    
    var timezone = dayjs.tz.guess();
    
    var dateFormatted = dayjs(date,formatInitial);
    var result = dayjs.tz(dateFormatted,timezone).utc().format('YYYY-MM-DD HH:mm:ss')//.toDate();
    
    return result;
}

// db date => remove offset => db date utc
export const dbDateWithOffsetToDbDate = (date) => {
    return dateWithOffsetToDbDate(date,'YYYY-MM-DD HH:mm:ss');
}

// input date => remove offset => db date utc
// 2024-12-01T12:00
export const inputDateWithOffsetToDbDate = (date) => {
    return dateWithOffsetToDbDate(date,'YYYY-MM-DDTHH:mm');
}

// from formatted to db
export const date2db = (date, hour = false, timezone = false) => {

    importPlugins();

    if(!date){
        return '';
    }

    var formatFinal = 'YYYY-MM-DD';
    var formatInitial = 'DD-MM-YYYY';
    if(hour){
        formatFinal = formatFinal+' HH:mm';
        formatInitial = formatInitial+' HH:mm';
    }

    if(!dayjs(date,formatInitial).isValid()){
        return '';  
    }

    return dayjs(date,formatInitial).format(formatFinal);
}

// date1 < date2 => -1, date1 = date2 => 0, date1 > date2 => 1
export const compareDates = (date1,date2,format = 'YYYY-MM-DD',format2 = null) => {

    var result = 0;

    importPlugins();

    var date1js = null;
    var date2js = null;

    var isNotValid1 = false;
    var isNotValid2 = false;
    if(!date1 || !dayjs(date1,format)){
        isNotValid1 = true;
    }
    else{
        date1js = dayjs(date1,format);
    }

    var formatSecondDate = format2 ? format2 : format;

    if(!date2 || !dayjs(date2,formatSecondDate)){
        isNotValid2 = true;
    }
    else{
        date2js = dayjs(date2,formatSecondDate);
    }

    if(isNotValid1){

        if(isNotValid2){
            result = 0; // same
        }
        else{
            result = -1; // b < a 
        }
    }
    else{
        // b with value but a empty
        if(isNotValid2){
            result = 1; // b > a 
        }
        else{
           
            if(date1js.isBefore(date2js)){
                result = -1;
            }
            else{
                if(date1js.isAfter(date2js)){
                    result = 1;
                }
                else {
                    result = 0;
                }
            }
        }
    }  

    return result;
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
        updated_at: date(item?.updated_at,false,false),
        code: item?.code ? item.code : null,
        hidden: item?.hidden ? item.hidden : 0,
        name: item?.name ? item.name : '',
        status: item?.status?.name && item.status.name.length > 0 ? t('animals.record.Status.'+item.status.name) : '',
        sponsor: item?.sponsor?.name && item.sponsor.name.length > 0 ? t('animals.record.Sponsored.'+item.sponsor.name) : '',        
        type: item?.type?.name && item.type.name.length > 0 ? t('animals.record.Type.'+item.type.name) : '',
        breed: item.breed?.description && item.breed?.description.length > 0 ? item.breed.description : '',
        gender: item?.gender?.name && item.gender.name.length > 0 ? t('animals.record.Gender.'+item.gender.name) : '',
        size: item?.size?.name && item.size.name.length > 0 ? t('animals.record.Size.'+item.size.name) : '',
        age: item?.age?.name && item.age.name.length > 0 ? t('animals.record.Age.'+item.age.name) : '',
        weight: item?.weight,
        birthdate: date(item?.birthdate,false,false),
        birthdate_year: dateYear(item?.birthdate),
        dead: item?.dead ? item.dead : 0,
        deathdate: date(item?.deathdate,false,false),
        deathdate_year: dateYear(item?.deathdate),
        internal: item?.internal && item.internal.length > 0 ? item.internal : '',
        description: item?.description && item.description.length > 0 ? item.description : '',
        location: item?.location && item.location.length > 0 ? item.location : '',
        image: item?.image ? item.image : '',
        image_file : null,
        image2: item?.image2 ? item.image2 : '',
        image2_file : null,   
        image_sponsored: item?.image_sponsored ? item.image_sponsored : '',
        image_sponsored_file : null,     
        video: item?.video ? item.video : '',    
        video2: item?.video2 ? item.video2 : '',
        person: item?.person ? item.person : null,
        person_name: peopleNames(item?.person),
        // save the ids as well
        status_id: item?.status_id,
        sponsor_id: item?.sponsor_id,
        type_id: item?.type_id,
        breed_id: item?.breed_id,
        gender_id: item?.gender_id,
        size_id: item?.size_id,
        age_id: item?.age_id,
        person_id: item?.person_id,
        vaccines: item?.vaccines ? item.vaccines : '',
        treatment: item?.treatment ? item.treatment : '',
        castrated: item?.castrated ? item.castrated : 0,
        date_entry: date(item?.date_entry,false,false),
        date_exit: date(item?.date_exit,false,false),
        date_entry2: date(item?.date_entry2,false,false),
        date_exit2: date(item?.date_exit2,false,false)
    };
  
    return itemFormatted;
}

// format people
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
        other_people: item?.other_people,
        description: item?.description,
        animals: item?.animals ? item.animals : null,
        animals_names: animalsNames(item?.animals),
        users: item?.users ? item.users : null,
        users_items: usersItems(item?.users)/*,
        users_names: usersNames(item?.users)*/
    };
  
    return itemFormatted;
}

export const formatPeopleOptions = (options) => {

    var optionsFormatted = [];

    if(options?.users && options.users.length > 0){

        options.users.map((user,index) => {
                                
            var element = {
                value : user?.id,
                label : userName(user)
            };                      

            optionsFormatted.push(element);
        });
    }
        
    return optionsFormatted;
}

// format news
export const formatNews = (t,items) => {

    var resultFormatted = [];

    if(items && items.length > 0){
                        
        items.map((item,i) => {

            var itemFormatted = formatNew(t,item);
          
            resultFormatted.push(itemFormatted);
        });
    }

    return resultFormatted;
}

export const formatNew = (t,item) => {

    var itemFormatted = {
        id: item?.id,        
        title: item?.title,
        description: item?.description,
        //description_short: item?.description && item?.description.length > 30 ? item?.description.substring(0,27)+'...' : item?.description,
        image: item?.image,
        image_file : null,
        date: date(item?.date,true,true),
        hidden: item?.hidden ? item.hidden : 0,
        user: item?.user ? item.user : null,
        user_name: item?.user?.name,
        user_id: item?.user_id
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

// format people names
export const peopleNames = (person, other = false) => {

    var names = '';

    var surname = person?.surname && person?.surname.length > 0 ? person.surname : '';
    var surname2 = person?.surname2 && person?.surname2.length > 0 ? person.surname2 : '';

    if(person?.name && person.name.length > 0){

        if(person?.name2 && person.name2.length > 0){
            names = person?.name+' '+surname+' / '+person?.name2+' '+surname2;
        }
        else{
            names = person?.name+' '+surname;
        }
    }
    else{
        
        if(person?.name2 && person.name2.length > 0){ 
            names = person?.name2+' '+surname2;
        }
        else{
            names = '';
        } 
    }

    // other people
    if(other && person?.other_people && person.other_people.length > 0){
        names = names+' / '+person.other_people;
    }

    return names;
}

// format animals names
export const animalsNames = (animals) => {

    var names = [];

    if(animals && animals.length > 0){
        animals.map((animal,index) => {
            names.push('['+animal?.code+']'+(animal?.name ? ' '+animal.name : ''));
        });
    }

    return names.join(' / ');
}

export const usersItems = (users) => {

    var items = [];

    if(users && users.length > 0){
        users.map((user,index) => {
            items.push({
                value: user?.id,
                label: userName(user)
            });
        });
    }

    return items;
}

// format users names
export const userName = (user) => {

    var name = '';

    if(user){        
        name = user?.email+(user?.name ? ' ('+user.name+')' : '');        
    }

    return name;
}

export const usersNames = (users) => {

    var names = [];

    if(users && users.length > 0){
        users.map((user,index) => {
            names.push(userName(user));
        });
    }

    return names.join(' / ');
}

// to compare values and order tables
export const descendingComparator = (a, b, orderBy, origin) => {

    var type = '';
    var result = 0; // same

    var nums = [];
    var datesSpanishSlash = []; // DD/MM/YYYY
    var datesSpanishDash = []; // DD-MM-YYYY
    var dates = []; // YYYY-MM-DD
    var booleans = [];
    switch(origin){

        case 'user-news':
            nums = ['hidden'];
            datesSpanishSlash = ['date'];
            booleans = ['hidden'];
            break;

        case 'user-animals':
            nums = ['code','size'];
            datesSpanishSlash = ['birthdate','deathdate','updated_at'];
            break;

        case 'user-people':            
            datesSpanishSlash = ['birthdate','birthdate2'];
            break;
    }

    var value1 = b[orderBy];
    var value2 = a[orderBy];

    if(nums.includes(orderBy)){
        type = 'numerical';
    }
    else{        
        if(datesSpanishSlash.includes(orderBy)){
            type = 'dateSpanishSlash';
        }
        else{
            if(dates.includes(orderBy)){
                type = 'date';
            }
            else{
                if(datesSpanishDash.includes(orderBy)){
                    type = 'dateSpanishDash';
                }
                else{
                    if(booleans.includes(orderBy)){
                        type = 'boolean';
                    }
                    else{
                        type = 'string';
                    }
                }
            }
        }
    }

    switch(type){

        case 'boolean':
            var value1bool = 1;
            if(!value1 || value1 === null || value1 === false){
                value1bool = 0;
            }

            var value2bool = 1;
            if(!value2 || value2 === null || value2 === false){
                value2bool = 0;
            }

            if(value1 < value2){
                result = -1;
            }
            else{
                if(value1 > value2){
                    result = 1;
                }
                else{
                    result = 0;
                }
            }
            break;

        case 'numerical':

            // if empty value, fill in with -1 to be the 1st
            // we don't have negative numbers on the list, so no problem
            var isNotValid1 = !value1 || value1 == '';
            var isNotValid2 = !value2 || value2 == '';

            if(isNotValid1){
                value1 = -1;
            }
            
            if(isNotValid2){
                value2 = -1;
            }

            if(value1 < value2){
                result = -1;
            }
            else{
                if(value1 > value2){
                    result = 1;
                }
                else{
                    result = 0;
                }
            }
        
            break;
        
        case 'date':
        case 'dateSpanishSlash':
        case 'dateSpanishDash':

            var format = 'YYYY-MM-DD';

            switch(type){

                case 'dateSpanishSlash':

                    var split = value1.split(' ');

                    // with hour
                    format = 'DD/MM/YYYY';
                    if(split.length > 1){
                        format = format+ ' hh:mm:ss';
                    }
                    break;

                case 'dateSpanishDash':

                    var split = value1.split(' ');

                    // with hour
                    format = 'DD-MM-YYYY';
                    if(split.length > 1){
                        format = format+ ' hh:mm:ss';
                    }                  
                    break;
                /*
                case 'date':
                default:
                    break;
                */
            }          

            result = compareDates(value1,value2,format);  
            break;

        case 'string':        

            var isNotValid1 = !value1 || value1.length === 0;
            var isNotValid2 = !value2 || value2.length === 0;

            if(isNotValid1){

                if(isNotValid2){
                    result = 0; // same
                }
                else{
                    result = -1; // b < a 
                }
            }
            else{
                // b with value but a empty
                if(isNotValid2){
                    result = 1; // b > a 
                }
                else{
                    // 1st < 2nd => -1
                    // 1st > 2nd => 1
                    // otherwise 0
                    var compare = value1.localeCompare(value2);            
                    result = compare;
                }
            }
            break;
    }

    return result;
}

export const getComparator = (order, orderBy, origin) => {
    
    return order === 'desc' ? 
        (a, b) => descendingComparator(a, b, orderBy, origin)
    : 
        (a, b) => -descendingComparator(a, b, orderBy, origin);
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