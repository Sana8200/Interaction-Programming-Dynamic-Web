import { SidebarView } from "/src/views/sidebarView.jsx";  
import { observer } from "mobx-react-lite";

const Sidebar = observer(       
    function SidebarRender(props){

        const guestsProp = props.model.numberOfGuests;        
        const dishesProp = props.model.dishes;

        function handleNumberChangeACB(newNumber){
            props.model.setNumberOfGuests(newNumber);
        }

        function handleDishInterestACB(dish){
            props.model.setCurrentDishId(dish.id);  
        }

        function handleDishRemoveACB(dish){
            props.model.removeFromMenu(dish);
        }

        return <SidebarView number={guestsProp}            // return (render) the SidebarView
                            dishes={dishesProp}
                            onNumberChange={handleNumberChangeACB}
                            onSelectedDish = {handleDishInterestACB}
                            onSelectedRemoveDish = {handleDishRemoveACB}
               />;
    }
);


export { Sidebar };