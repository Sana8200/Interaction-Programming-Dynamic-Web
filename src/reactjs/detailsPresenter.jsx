import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { observer } from "mobx-react-lite";

// Details presenter decides whta to render whether DetailsView or SuspenseView
const Details = observer(
    function DetailsRender(props) {

        const state = props.model.currentDishPromiseState;
        const guests = props.model.numberOfGuests;

        // Event handler for Add to Menu
        function handleAddToMenuACB(){
            if(state.data){
                props.model.addToMenu(state.data);
            }
        }
        // if promise is resolved, show DetailsView
        if (state.data) {
            const isDishInMenu = props.model.dishes.find(function findDishByIdCB(dish) {
                return props.model.currentDishId === dish.id;
            });

            // rendered only if current dish promise state data is truthy
            return <DetailsView dishData = {state.data}
                                guests = {guests}
                                isDishInMenu = {Boolean(isDishInMenu)}
                                onAddToMenu = {handleAddToMenuACB}
            />;
        }

        // otherwise (pending, error, no data, data not yet resolved, no promise) return suspenseView 
        return <SuspenseView promise = {state.promise}
                                 error = {state.error}
            />;
    }
);


export { Details };
