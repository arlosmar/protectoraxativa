
export const csv = (origin,t,title,baseUrl,imagesPaths,headerCols,items) => {

    var headerNames = []; 
    var itemsExport = [];

    headerCols.map((headerCol) => {
        headerNames.push(headerCol?.text);
    });

    const dataResult = [headerNames];

    items.map((item) => {

        var bodyRow = [];
        headerCols.map((headerCol) => {                        

            if(item[headerCol?.id] === null){
                item[headerCol?.id] = '-';
            }
            else{
                var colId = headerCol?.id;

                if(origin === 'animals'){

                    switch(colId){

                        case 'image':
                        case 'image2':
                            if(item[colId] && item[colId].length > 0){  

                                if(item?.dead && item?.hidden){
                                    item[colId] = baseUrl+imagesPaths?.animals+item[colId];
                                }
                                else{
                                    item[colId] = baseUrl+imagesPaths?.animals_external+item[colId];                                
                                }                                  
                            }
                            break;

                        case 'castrated':
                            item[colId] = !item[colId] ? t('trans.No') : t('trans.Yes')
                            break;
                    }
                }
                else{
                    if(origin === 'news'){

                        switch(colId){

                            case 'image':                        
                                if(item[colId] && item[colId].length > 0){  
                                    item[colId] = baseUrl+imagesPaths?.news+item[colId];                                
                                }
                                break;

                            case 'hidden':
                                item[colId] = !item[colId] ? t('trans.No') : t('trans.Yes')
                                break;
                        }
                    }
                }

                // if number, change to string
                if(!isNaN(item[headerCol?.id])){
                    item[headerCol?.id] = ''+item[headerCol?.id];
                }
                
                item[headerCol?.id] = item[headerCol?.id]
                .replaceAll('\r\n', '')
                .replaceAll('\n', '')
                .replaceAll('\r', '')
                .replaceAll('"',"\"");

            }

            bodyRow.push(item[headerCol?.id]);
        });

        itemsExport.push(bodyRow);
        dataResult.push(bodyRow);

    });
    
    // Convert the data array into a CSV string
    const csvString = dataResult.map(row => '"'+row.join('","')+'"').join("\n");

    // Create a Blob from the CSV string
    var csvEncoded = "\ufeff"+csvString;
    const blob = new Blob([csvEncoded], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}