import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "/src/style.css";

export function LoginView(props) {
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmitACB(event) {
        event.preventDefault();
        props.onLogin();
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">Dinner Planner</h1>
                <h2 className="auth-subtitle">Welcome back</h2>

                <form onSubmit={handleSubmitACB}>
                    {props.error && (
                        <div className="auth-error">{props.error}</div>
                    )}

                    <div className="auth-form-group">
                        <label className="auth-label">Email</label>
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="Enter your email"
                            value={props.email}
                            onChange={(e) => props.onEmailChange(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label className="auth-label">Password</label>
                        <div className="auth-password-wrapper">
                            <input
                                className="auth-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={props.password}
                                onChange={(e) => props.onPasswordChange(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={props.loading}
                    >
                        {props.loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <a onClick={props.onSwitchToSignup} className="auth-link">
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
}