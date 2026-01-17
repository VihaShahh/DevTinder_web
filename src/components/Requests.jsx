import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests ?? []);

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                `/api/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );

            dispatch(setRequests(requests.filter(r => r._id !== _id)));

        } catch (err) {
            console.error("Error reviewing request:", err);
        }
    };


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get("/api/user/requests/received", {
                    withCredentials: true,
                });

                dispatch(setRequests(res?.data?.data || []));
            } catch (err) {
                console.error("Error fetching requests:", err);

                if (err.response) {
                    console.log("Backend Error:", err.response.data);
                } else {
                    console.log("Network Error:", err.message);
                }
            }
        };

        fetchRequests();
    }, [dispatch]);

    if (requests.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-gray-800 via-gray-900 to-black p-5">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/9539/9539995.png"
                    alt="no-requests"
                    className="w-36 opacity-90"
                />
                <h2 className="text-2xl font-bold mt-4">No Requests Found</h2>
                <p className="text-gray-400 mt-1">
                    You have no pending connection requests.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-5">
            <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {requests.map((req) => {
                    const user = req.fromUserId;

                    return (
                        <div
                            key={req._id}
                            className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition flex flex-col items-center text-center"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <img
                                    src={
                                        user.photoUrl ||
                                        "https://cdn-icons-png.flaticon.com/512/848/848006.png"
                                    }
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
                                            {user.age && user.gender ? " • " : ""}
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

                            <div className="flex gap-3 mt-4 justify-center">
                                <button
                                    onClick={() => reviewRequest("accepted", req._id)}
                                    className="px-4 py-1 rounded-lg bg-purple-600 hover:bg-purple-700"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => reviewRequest("rejected", req._id)}
                                    className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;
