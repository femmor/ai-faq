import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => { }}
                    className={`w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 ${!password ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    disabled={false}
                >
                    {!password ? "Logging in..." : "Login"}
                </button>

                {!password && (
                    <p className="mt-4 text-red-500 text-center">Login failed</p>
                )}
            </div>
        </div>
    );
};

export default Login;
