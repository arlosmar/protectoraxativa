import { compareDates, validDBdate } from "@/Utils/Format";

export const filter = (from,originalItems,fields,data) => {

	var result = [];
	var itemsFiltered = [];
	
	if(originalItems && originalItems.length > 0){

		itemsFiltered = originalItems.filter((item) => {

	        var result = true;
	        Object.keys(data).map((keyItem,index) => {

	        	var type = fields[keyItem];

	        	var checkKeys = [keyItem];
	        	var checkResultsFalse = 0;

                // if people, check second person
	            if(from === 'people' && keyItem !== 'other_people'){
	            	checkKeys.push(keyItem+'2');	            	
	            }

	            checkKeys.map((key,index) => {

		            switch(type){

		                case 'date':
		                	
		                    if(validDBdate(data[keyItem])){

		                    	var compare = compareDates(data[keyItem],item[key],'YYYY-MM-DD','DD-MM-YYYY');
		                        
		                        if(compare !== 0){
		                            checkResultsFalse++;		                            
		                        }
		                    }
		                    break;

		                case 'integer':
		                	
		                    if(data[keyItem] !== null){
		                        if(
		                            item[key] === null ||
		                            parseInt(item[key]) !== parseInt(data[keyItem])
		                        ){
		                            checkResultsFalse++;		                            
		                        }
		                    }
		                    break;

		                case 'float':

		                    if(data[keyItem] !== null){
		                        if(
		                            item[key] === null ||
		                            parseFloat(item[key]) !== parseFloat(data[keyItem])
		                        ){
		                            checkResultsFalse++;		                            
		                        }
		                    }
		                    break;

		                case 'boolean':
		                	
		                    // false
		                    var dataValue = true;
		                    if(!data[keyItem] || data[keyItem] === null || data[keyItem] === 0 || data[keyItem] === false){
		                        dataValue = false;
		                    }

		                    var itemValue = true;
		                    if(!item[key] || item[key] === null || item[key] === 0 || item[key] === false){
		                        itemValue = false;
		                    }

		                    if(dataValue !== itemValue){
		                        checkResultsFalse++;		                        
		                    }
		                    break;

		                case 'text':
		                default:
		                	
		                    if(data[keyItem] && data[keyItem].length > 0){
		                        if(
		                            !item[key] || 
		                            item[key].length === 0 ||
		                            !item[key].toLowerCase().includes(data[keyItem].toLowerCase())
		                        ){
		                            checkResultsFalse++;
		                        }
		                    }
		                    break;
		            }
		        })

		        // if any of the checkResults is true, result is true
		        // if all false, result false and jump to next item
		        if(checkResultsFalse === checkKeys.length){
		       		result = false;
		       		return;
	        	}

	        });

	        return result;
	    });
	}

	return itemsFiltered;
}
