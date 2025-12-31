import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "/src/style/style.css";

export function SignupView(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleSubmitACB(event) {
        event.preventDefault();
        props.onSignup();
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">Dinner Planner</h1>
                <h2 className="auth-subtitle">Create your account</h2>

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
                                placeholder="At least 6 characters"
                                value={props.password}
                                onChange={(e) => props.onPasswordChange(e.target.value)}
                                minLength={6}
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

                    <div className="auth-form-group">
                        <label className="auth-label">Confirm Password</label>
                        <div className="auth-password-wrapper">
                            <input
                                className="auth-input"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Repeat your password"
                                value={props.confirmPassword}
                                onChange={(e) => props.onConfirmPasswordChange(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={props.loading}
                    >
                        {props.loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <a onClick={props.onSwitchToLogin} className="auth-link">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}