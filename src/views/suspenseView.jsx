import "/src/style.css"
import dinnerImage from "/src/dinner_table.jpg";

export function SuspenseView(props) {
    // props used: promise, error 

    if(props.error){
        return (
            <div className="suspense-error">
                <span>{props.error.toString()}</span>
            </div>
        );
    }

    if (props.promise && !props.error) {
        return (
            <div className="suspense-loading">
                <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
            </div>
        );
    }

    

    // If there is no promise (Initial state), show a nice Welcome message!
    if(!props.promise){
        return (
            <div className="welcome-container">
                <div className="welcome-text">
                    <h1>Welcome to Dinner Planner! 🍽️</h1>
                    <p>
                        Discover delicious recipes, plan your menu, and generate your shopping list automatically in{' '}
                        <a href="#/summary" className="summery-pointer">
                            Summary
                        </a>.
                    </p>
                    <p className="welcome-hint">
                        Use the search bar above or select a dish type to get started!    
                    </p>
                </div>   
                <img onClick={props.onStartSearch}
                    src={dinnerImage} 
                    alt="Dinner Table" 
                    className="welcome-image"
                    style={{ cursor: "pointer" }}
                    title="Click to see some food!"
                />
                
                <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "5px" }}>
                    Image by Freepik
                </div>
            </div>
        );
    }

    // "No Data" State (Promise resolved but no results found)
    if(props.promise && props.data === null){
         return <span>no data!</span>
    }
}


/*
picture downloaded from this side : https://www.freepik.com/free-photos-vectors/dinner 
*/