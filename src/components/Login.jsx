import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMsg(""); 
        if (!emailId || !password) {
            setErrorMsg("Please enter both email and password");
            return;
        }

        try {
            const res = await axios.post(
                "/api/login",
                { emailId, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 10000,
                }
            );

            dispatch(addUser(res.data.data));
            navigate("/feed");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-300 px-4">
            <div className="card bg-base-100 w-96 shadow-xl border border-base-300">
                <div className="card-body">
                    <div className="w-full flex justify-center">
                        <h2 className="text-2xl font-semibold">Login</h2>
                    </div>

                    <fieldset className="fieldset mt-4">
                        <legend className="fieldset-legend text-sm font-medium">Email ID</legend>
                        <input
                            type="email"
                            value={emailId}
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset mt-4">
                        <legend className="fieldset-legend text-sm font-medium">Password</legend>
                        <input
                            type="password"
                            value={password}
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>

                    {errorMsg && (
                        <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                    )}

                    <div className="card-actions mt-6">
                        <button className="btn btn-primary w-full" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
