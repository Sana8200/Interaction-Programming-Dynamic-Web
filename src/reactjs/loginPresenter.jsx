import { useState } from "react";
import { observer } from "mobx-react-lite";
import { loginWithEmail } from "/src/Authservice.js";  
import { LoginView } from "../views/loginView.jsx";

export const LoginPresenter = observer(
    function LoginPresenter(props) {
        
        // component state 
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);


        async function handleLoginACB() {
            setError(null);

            if (!email || !password) {
                setError("Please fill in all fields.");
                return;
            }

            setLoading(true);
            
            // calling logging in function from auth service 
            const result = await loginWithEmail(email, password);
            
            setLoading(false);

            if (!result.success) {
                setError(result.error);
                console.log("Error when logging in...", result.error);
            }
            // If success, onAuthChange will detect login and ReactRoot will show the app
        }

        return (
            <LoginView
                email={email}
                password={password}
                loading={loading}
                error={error}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onLogin={handleLoginACB}
                onSwitchToSignup={props.onSwitchToSignup}
            />
        );
    }
);