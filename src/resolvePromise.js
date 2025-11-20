

// promise state 
/* Promise only executes only when it's truthy, if promise is null or underfined promise state should still be set 
   (reset in this case) but promise shouldn't be executed. */
export function resolvePromise(prms, promiseState){
     
    // Setting the promise state to the given promise (prms), and resetting data and error to null
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    
    // If the promise has not yet been set, we will show no data
    if(!prms){
        promiseState.promise = null;
        promiseState.data = null;
        promiseState.error = null;
        return;
    }


    // save its parameters into promiseState.data (data and error cannot be both truthy at the same time)
    function datraACB(data){
        if(promiseState.promise !== prms){
            return;
        }
        promiseState.data = data;
        promiseState.error = null;
    }

    // saving the error into promiseState.error
    function errorACB(error){
        if(promiseState.promise !== prms){ 
            return;
        }
        promiseState.error = error;
        promiseState.data = null;  
    }

    prms.then(datraACB).catch(errorACB);
}
