import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
    const user = useSelector((state) => state.user);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true });
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm px-4">
            <div className="flex-1">
                {user ? (
                    <Link
                        to="/"
                        className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 
                                   text-xl text-neutral-content transition"
                    >
                        👩‍💻 DevTinder
                    </Link>
                ) : (
                    <span
                        className="px-3 py-1 rounded-md bg-white/20 
                                   text-xl text-neutral-content cursor-default"
                    >
                        👩‍💻 DevTinder
                    </span>
                )}
            </div>

            {!user && (
                <div className="flex-none">
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                </div>
            )}

            {user && (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold">Welcome, {user.firstName}</p>

                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-12 rounded-full">
                                <img
                                    alt="avatar"
                                    src={user.photoUrl || "/default-avatar.png"}
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-neutral text-neutral-content
                                       rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            <li><Link to="/profile">👤 Profile</Link></li>
                            <li><Link to="/connections">🤝 Connections</Link></li>
                            <li><Link to="/requests">📨 Requests</Link></li>
                            <li><Link to="/feed">🔥 Feed</Link></li>
                            <li><button onClick={handleLogout}>🚪 Logout</button></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
