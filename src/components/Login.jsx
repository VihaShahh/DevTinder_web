import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setLoginForm] = useState(true);
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
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));
            navigate("/profile");

        } catch (error) {
            console.error("Login error:", error);
            setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    const handleSignUp = async () => {
        setErrorMsg("");

        if (!emailId || !password || !firstName || !lastName) {
            setErrorMsg("All fields are required for signup");
            return;
        }

        try {
            const res = await axios.post(
                "/api/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));
            navigate("/profile");

        } catch (error) {
            console.error("Signup error:", error);
            setErrorMsg(error.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen 
        bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4">

            <div className="card bg-base-100 w-96 shadow-xl border border-base-300">
                <div className="card-body">
                    <div className="w-full flex justify-center">
                        <h2 className="text-2xl font-semibold">
                            {isLoginForm ? "Login" : "Sign Up"}
                        </h2>
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

                    {!isLoginForm && (
                        <>
                            <fieldset className="fieldset mt-4">
                                <legend className="fieldset-legend text-sm font-medium">First Name</legend>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your first name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset mt-4">
                                <legend className="fieldset-legend text-sm font-medium">Last Name</legend>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>
                        </>
                    )}


                    {errorMsg && (
                        <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                    )}

                    <div className="card-actions mt-6">
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => {
                                if (isLoginForm) handleLogin();
                                else handleSignUp();
                            }}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className="text-center text-sm text-blue-500 mt-3 cursor-pointer"
                        onClick={() => {
                            setFirstName("");
                            setLastName("");
                            setErrorMsg("");
                            setLoginForm(!isLoginForm);
                        }}
                    >
                        {isLoginForm
                            ? "New user? Create an account"
                            : "Already have an account? Login"}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
