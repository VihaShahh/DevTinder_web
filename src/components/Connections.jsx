import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(
                    "/api/users/connections",
                    { withCredentials: true }
                );
                dispatch(setConnections(res.data.data || []));
            } catch (err) {
                console.error("Error fetching connections:", err);
            }
        };

        fetchConnections();
    }, [dispatch]);

    if (connections.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-gray-800 via-gray-900 to-black p-5">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="no-connections"
                    className="w-36 opacity-90"
                />
                <h2 className="text-2xl font-bold mt-4">No Connections Found</h2>
                <p className="text-gray-400 mt-1">
                    Connect with people to build your network.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-5">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Your Connections
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {connections.map((user) => (
                    <div
                        key={user._id}
                        className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoUrl || "https://cdn-icons-png.flaticon.com/512/848/848006.png"}
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover border border-gray-600"
                            />

                            <div>
                                <h2 className="text-xl font-semibold">
                                    {user.firstName} {user.lastName}
                                </h2>

                                {(user.gender || user.age) && (
                                    <p className="text-sm text-gray-400">
                                        {user.age ? user.age : ""}
                                        {user.age && user.gender ? " · " : ""}
                                        {user.gender ? user.gender : ""}
                                    </p>
                                )}

                            </div>
                        </div>


                        {user.about && (
                            <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                                {user.about}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;
