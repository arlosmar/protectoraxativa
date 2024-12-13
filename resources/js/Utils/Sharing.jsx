
export const shareGetAnimalLink = (origin,animal) => {

	var link = '';
	var linkAdmin = ''; 

	var tag = '';
    var subtag = '';
    var tagAdmin = '';

    // if coming from user
    if(origin === 'user-animals' || origin === 'user-people'){

        /*
        share external link because maybe you want to share with general public
        if(animal?.hidden){
            tag = 'hidden';
        }
        else{
            if(animal?.dead){
                tag = 'heaven';
            }
            else{

                switch(animal?.status_id){

                    case 2: // adopted            
                        tag = 'adopted';
                        break;

                    case 1: //'adopt'
                        tag = 'adopt';
                        break;
                }
            }
        }

        setLink(route('admin.animals',[tag])+'?view='+animal?.id);
        */

        if(animal?.dead){
            // private link
            if(animal?.hidden){
                tag = 'heaven';
                link = route('admin.animals',[tag])+'?view='+animal?.id;
            }
            else{
                // public link
                //tag = 'heaven';
                //subtag = 'animals';
                //link = route('animals',[tag,subtag])+'?view='+animal?.id;
                tag = 'heaven';
                link = route('admin.animals',[tag])+'?view='+animal?.id;
            }
        }            
        else{
            // if hidden, internal link
            if(animal?.hidden){
                tag = 'hidden';
                link = route('admin.animals',[tag])+'?view='+animal?.id;
            }
            else{

                switch(animal?.status_id){

                    case 2: // adopted    
                        // internal link        
                        tag = 'adopted';
                        link = route('admin.animals',[tag])+'?view='+animal?.id;
                        break;

                    case 1: //'adopt'
                    default:

                        // potentially sponsor
                        if(animal?.sponsor_id === 3){
                            //tag = 'sponsor';
                            //subtag = 'animals';
                            //link = route('animals',[tag,subtag])+'?view='+animal?.id;
                            tag = 'adopt';
                            link = route('admin.animals',[tag])+'?view='+animal?.id;
                        }
                        else{
                            // sponsored
                            if(animal?.sponsor_id === 2){
                                //tag = 'sponsor';
                                //subtag = 'sponsored';
                                //link = route('animals',[tag,subtag])+'?view='+animal?.id;
                                tag = 'adopt';
                                link = route('admin.animals',[tag])+'?view='+animal?.id;
                            }
                            else{
                                // sponsor_id 1 is not sponsored but you do not see publicly
                                // internal link in adopt section
                                tag = 'adopt';
                                link = route('admin.animals',[tag])+'?view='+animal?.id;
                            }
                        }
                        break;
                }
            }
        }
    }
    else{
       
        switch(origin){

            case 'adopt':           
                tag = 'adopt';
                subtag = 'animals';
                tagAdmin = 'adopt';                    
                break;

            case 'adopted':           
                tag = 'adopt';
                subtag = 'adopted';
                tagAdmin = 'adopted';                    
                break;

            case 'sponsor':           
                tag = 'sponsor';
                subtag = 'animals';
                tagAdmin = 'adopt';
                break;

            case 'sponsored':           
                tag = 'sponsor';
                subtag = 'sponsored';
                tagAdmin = 'adopt';
                break;

            case 'heaven':           
                tag = 'heaven';
                subtag = 'animals';
                tagAdmin = 'heaven';
                break;
        }
        
        link = route('animals',[tag,subtag])+'?view='+animal?.id;
        linkAdmin = route('admin.animals',[tagAdmin])+'?view='+animal?.id;
    }

    return { link, linkAdmin };
}