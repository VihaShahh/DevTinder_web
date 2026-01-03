import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const handlelogin = async () => {
        if (!emailId || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            // Try using the proxy first (recommended)
            // If proxy doesn't work, the error will tell us
            const backendUrl = "/api/login";
            console.log("Attempting login via Vite proxy:", backendUrl);
            console.log("Frontend origin:", window.location.origin);
            console.log("This will be proxied to: http://127.0.0.1:3000/login");

            const res = await axios.post(
                backendUrl,
                { emailId, password },
                { 
                    withCredentials: true, // ← important for cookies
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000, // 10 second timeout
                }
            );

            console.log("Login successful:", res.data);
            alert("Login successful!");
        } catch (error) {
            console.error("Full error object:", error);
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            console.error("Error code:", error.code);
            
            if (error.response) {
                // Server responded with error
                console.error("❌ Server error:", error.response.status, error.response.data);
                console.error("Response headers:", error.response.headers);
                alert(`Login failed: ${error.response.data.message || error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                // Request made but no response
                console.error("❌ No response from server");
                console.error("Request details:", error.request);
                console.error("Request URL:", error.config?.url);
                console.error("Request method:", error.config?.method);
                
                // Check for CORS errors
                if (error.message?.includes('CORS') || error.message?.includes('cors')) {
                    console.error("🚨 CORS ERROR DETECTED!");
                    console.error("Your backend CORS should allow:", window.location.origin);
                    alert(`CORS Error! Your backend needs to allow requests from: ${window.location.origin}\n\nCheck your backend CORS configuration.`);
                } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
                    console.error("🚨 NETWORK ERROR - Cannot reach server");
                    alert("Cannot connect to server. Please check:\n1. Backend is running on port 3000\n2. Backend CORS allows: " + window.location.origin + "\n3. No firewall blocking the connection");
                } else {
                    alert("Cannot connect to server. Error: " + (error.message || error.code || 'Unknown error'));
                }
            } else {
                // Something else happened
                console.error("❌ Error:", error.message);
                alert(`Error: ${error.message}`);
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

                    <div className="card-actions mt-6">
                        <button className="btn btn-primary w-full" onClick={handlelogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
