import "/src/style.css"


export function SuspenseView(props) {
    // props used: promise, error 

    // If there is an error render the error message inside a span 
    if(props.error){
        return (
            <div className="suspense-error">
                <span>{props.error.toString()}</span>
            </div>
        );
    }

    // If there is a promise and it's pending (loading state)
    if (props.promise && !props.error) {
        return (
            <div className="suspense-loading">
                <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
            </div>
        );
    }

    // If there is no promise (Initial state), show a nice Welcome message!
    if(!props.promise){
        return <span>no data</span>
    }
}
