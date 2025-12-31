import { observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView.jsx";

export const Sidebar = observer(function Sidebar(props) {
    const { model } = props;

    return (
        <SidebarView
            number={model.numberOfGuests}
            dishes={model.dishes}
            onNumberChange={(n) => model.setNumberOfGuests(n)}
            onSelectedDish={(dish) => model.setCurrentDishId(dish.id)}
            onSelectedRemoveDish={(dish) => model.removeFromMenu(dish)}
        />
    );
});
