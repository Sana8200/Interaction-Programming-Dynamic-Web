import { useState } from "react";
import { observer } from "mobx-react-lite";
import { signupWithEmail } from "/src/Authservice.js";  
import { SignupView } from "../views/signupView.jsx";

export const SignupPresenter = observer(
    function SignupPresenter(props) {      
        
        // Form state
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        async function handleSignupACB() {
            setError(null);
            if (!email || !password || !confirmPassword) {
                setError("Please fill in all fields.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords don't match!");
                return;
            }
            if (password.length < 6) {
                setError("Password must be at least 6 characters.");
                return;
            }
            setLoading(true);
            
            // creating an account 
            const result = await signupWithEmail(email, password);
            
            setLoading(false);

            if (!result.success) {
                setError(result.error);
            }
            // If success, onAuthChange will detect signup and ReactRoot will show the app
        }

        return (
            <SignupView
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                loading={loading}
                error={error}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSignup={handleSignupACB}
                onSwitchToLogin={props.onSwitchToLogin}
            />
        );
    }
);