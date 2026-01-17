import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFeed = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/feed", { withCredentials: true });
            setUsers(res.data.users || []);
        } catch (error) {
            console.error("Error fetching feed:", error);
            setUsers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        getFeed();
    }, []);

    const handleNext = (userId) => {
        setUsers(users.filter((u) => u._id !== userId));
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                <div className="text-white text-xl animate-pulse">Loading feed...</div>
            </div>
        );

    if (!users.length)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8">
                <div className="text-6xl mb-4 animate-bounce">👥</div>
                <h2 className="text-white text-3xl font-semibold mb-2">No Users Left!</h2>
                <p className="text-gray-400 text-center mb-6 max-w-sm">
                    You've swiped through all available profiles. Check back later for more users.
                </p>
                <button
                    onClick={getFeed}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                >
                    🔄 Refresh Feed
                </button>
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <UserCard user={users[0]} onAction={handleNext} />
        </div>
    );
};

export default Feed;
