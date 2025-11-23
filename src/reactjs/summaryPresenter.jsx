import { SummaryView } from "/src/views/summaryView.jsx";    // importing the view
import { observer } from "mobx-react-lite";

import { shoppingList } from "../utilities.js";


const Summary = observer(           
    function SummaryRender(props){

        const peopleProp = props.model.numberOfGuests;   
        const ingredientsProp = shoppingList(props.model.dishes); 
        
        return <SummaryView people={peopleProp}   
                            ingredients={ingredientsProp}
               />;   
    }
);

export { Summary };
