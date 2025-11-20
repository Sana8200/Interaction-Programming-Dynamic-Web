
export function SuspenseView(props) {
    // props used: promise, error 

    // If there is an erro render the error message inide a span 
    if(props.error){
        return <span>{props.error.toString()}</span>
    }

    // If there is a promise and it's pending
    if (props.promise && !props.error) {
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />;
    }

    if(!props.promise){
    // If there is no promise, render "no data" inside a span
    return <span>no data</span>;
    }
}