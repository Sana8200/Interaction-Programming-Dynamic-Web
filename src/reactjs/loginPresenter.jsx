import { useState } from "react";
import { observer } from "mobx-react-lite";
import { loginWithEmail } from "/src/Authservice.js";
import { LoginView } from "../views/loginView.jsx";

export const LoginPresenter = observer(function LoginPresenter(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin() {
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const result = await loginWithEmail(email, password);
        setLoading(false);

        if (!result.success) {
            setError(result.error);
        }
        // Success: onAuthChange detects login and ReactRoot updates automatically
    }

    return (
        <LoginView
            email={email}
            password={password}
            loading={loading}
            error={error}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
            onSwitchToSignup={props.onSwitchToSignup}
        />
    );
});