import { useState } from "react";
import api from "../services/api";
import Logo from "../components/Logo";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await api.post("/login", { username, password });
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-watermark">
                <Logo size={420} />
            </div>

            <div className="auth-card">
                <div className="auth-card-header">
                    <Logo size={48} />
                    <h2>Indian University Platform</h2>
                    <span className="eyebrow">Administrative Console</span>
                </div>

                {error && <div className="state-banner error" role="alert">{error}</div>}

                <form onSubmit={login}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder="e.g. r.reddy"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
