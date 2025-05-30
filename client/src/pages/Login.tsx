import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLogin();

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => loginMutation.mutate({ email, password })}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>

            {loginMutation.isError && <p className="error">Login failed</p>}
        </div>
    );
};

export default Login;
