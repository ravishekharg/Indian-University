import { useState } from "react";
import api from "../services/api";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const login = async () => {

        const response =
            await api.post(
                "/login",
                {
                    username,
                    password
                }
            );

        localStorage.setItem(
            "token",
            response.data.token
        );
    };

    return (

        <div>

            <h1>Login</h1>

            <input
                placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={login}>
                Login
            </button>

        </div>
    );
}

export default Login;