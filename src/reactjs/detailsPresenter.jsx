import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { getDishDetails } from "../model/dishSource.js";
import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Details = observer(function Details(props) {
    const { model } = props;
    const [promiseState, setPromiseState] = useState({
        promise: null,
        data: null,
        error: null
    });

    useEffect(() => {
        if (!model.currentDishId) {
            setPromiseState({ promise: null, data: null, error: null });
            return;
        }

        const promise = getDishDetails(model.currentDishId);
        setPromiseState({ promise, data: null, error: null });

        let isCancelled = false;

        promise
            .then(data => {
                if (!isCancelled) {
                    setPromiseState({ promise, data, error: null });
                }
            })
            .catch(error => {
                if (!isCancelled) {
                    setPromiseState({ promise, data: null, error });
                }
            });

        return () => { isCancelled = true; };
    }, [model.currentDishId]);

    function handleAddToMenu() {
        if (promiseState.data) {
            model.addToMenu(promiseState.data);
        }
    }

    if (promiseState.data) {
        const isDishInMenu = model.dishes.some(
            dish => dish.id === model.currentDishId
        );

        return (
            <DetailsView
                dishData={promiseState.data}
                guests={model.numberOfGuests}
                isDishInMenu={isDishInMenu}
                onAddToMenu={handleAddToMenu}
            />
        );
    }

    return (
        <SuspenseView
            promise={promiseState.promise}
            error={promiseState.error}
        />
    );
});
