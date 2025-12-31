import { observer } from "mobx-react-lite";
import { logout } from "/src/Authservice.js";
import { UserBarView } from "../views/userView.jsx";

export const UserBar = observer(function UserBar(props) {
    const { model } = props;

    async function handleLogout() {
        const result = await logout();
        if (!result.success) {
            console.error("Logout failed:", result.error);
        }
        // onAuthChange in firestoreModel detects logout automatically
    }

    if (!model.user) {
        return null;
    }

    return (
        <UserBarView
            user={model.user}
            onLogout={handleLogout}
        />
    );
});
