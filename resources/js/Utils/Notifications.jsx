
// request notification permissions
export const requestPermission = async () => {
//const requestPermission = async () => {
    try {
        Notification.requestPermission().then(permission => {
            if(permission === 'granted'){                
                //console.log('Permission for notification');                
            }
            else{
                //console.log('No permission for notifications');
            }
        });
    }
    catch (err) {
        //console.error('Error getting token:', err);
    }
};