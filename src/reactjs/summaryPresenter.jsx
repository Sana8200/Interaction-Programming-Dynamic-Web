import { observer } from "mobx-react-lite";
import { SummaryView } from "../views/summaryView.jsx";
import { shoppingList } from "../utilities.js";

export const Summary = observer(function Summary(props) {
    const { model } = props;

    return (
        <SummaryView
            people={model.numberOfGuests}
            ingredients={shoppingList(model.dishes)}
        />
    );
});
