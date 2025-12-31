import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { getDishDetails } from "/src/model/dishSource.js";

// Details presenter decides whta to render whether DetailsView or SuspenseView
const Details = observer(
    function DetailsRender(props) {

        const guests = props.model.numberOfGuests;

        // local state to track the promise, data, and error
        const [promiseState, setPromiseState] = useState({ promise: null, data: null, error: null });
        const currentDishId = props.model.currentDishId;

        // this part runs whenever currentDishId changes
        useEffect(() => {
            // no current dish id selected, reset 
            if (!currentDishId) {
                setPromiseState({ promise: null, data: null, error: null });
                return;
            }
            // API call
            const promise = getDishDetails(currentDishId);

            // Set loading state (spinner) immediately after api call 
            setPromiseState({ promise: promise, data: null, error: null });

            // Track if this effect is still current (race condition handling)
            let isCancelled = false;

            // Handling promise result, storing data when api success or catch the error if unsuccessful 
            promise.then((data) => {
                if (!isCancelled) {
                    setPromiseState({ promise: promise, data: data, error: null });
                }
            }).catch((error) => {
                if (!isCancelled) {
                    setPromiseState({ promise: promise, data: null, error: error });
                }
            });

            // Cleanup function for race conditions
            return () => {
                isCancelled = true;
            };
        }, [currentDishId]);  // Dependency array so re-run when current dish id changes 


        // Event handler for Add to Menu
        function handleAddToMenuACB() {
            if (promiseState.data) {
                props.model.addToMenu(promiseState.data);
            }
        }

        // if promise is resolved, show DetailsView
        if (promiseState.data) {
            const isDishInMenu = props.model.dishes.find(function findDishByIdCB(dish) {
                return props.model.currentDishId === dish.id;
            });

            // rendered only if current dish promise state data is truthy
            return <DetailsView dishData={promiseState.data}
                guests={guests}
                isDishInMenu={Boolean(isDishInMenu)}
                onAddToMenu={handleAddToMenuACB}
            />;
        }

        // otherwise (pending, error, no data, data not yet resolved, no promise) return suspenseView 
        return <SuspenseView promise={promiseState.promise} 
                             error={promiseState.error}
        />;
    }
);

export { Details };