// User info and logout button
import { observer } from "mobx-react-lite";
import { logout } from "/src/Authservice.js";  
import { UserBarView } from "/src/views/userView.jsx";

export const UserBar = observer(
    function UserBarPresenter(props) {

        // When user clicks Sign Out
        async function handleLogoutACB() {
            const result = await logout();
            
            if (!result.success) {
                console.error("Logout failed:", result.error);
            }
            // onAuthChange in firestoreModel will detect the logout, ReactRoot will automatically show login screen, NO manual redirect needed
        }

        // not rendering if there is no user 
        if (!props.model.user) {
            return null;
        }

        return (
            <UserBarView 
                user={props.model.user}
                onLogout={handleLogoutACB}
            />
        );
    }
);