import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            const res = await axios.get("/api/feed", { withCredentials: true });
            dispatch(addFeed(res.data.users));
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return <div>Loading...</div>;

    return (
        <div className="min-h-screen p-8 
    bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-wrap 
    justify-center gap-8">

            {feed.map((user) => (
                <div
                    key={user._id}
                    className="card bg-base-100 w-96 shadow-2xl rounded-2xl border border-base-300 
                hover:shadow-[0_0_25px_rgba(0,0,0,0.4)] 
                hover:-translate-y-1 transition-all duration-300"
                >

                    <figure className="rounded-t-2xl overflow-hidden">
                        <img
                            src={user.photoUrl || "https://via.placeholder.com/300"}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-full h-64 object-cover"
                        />
                    </figure>


                    <div className="card-body space-y-3">

                        <h2 className="card-title text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h2>

                        <p className="opacity-80">
                            {user.about || "This user has no description."}
                        </p>

                        {user.skills && user.skills.length > 0 && (
                            <div>
                                <h3 className="font-semibold">Skills</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-primary badge-outline px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}


                        <div className="card-actions justify-center mt-4 gap-5">

                            <button className="btn btn-outline btn-error rounded-xl 
                        hover:bg-red-500 hover:text-white hover:scale-[1.04] 
                        transition-all duration-200">
                                Ignore
                            </button>

                            <button className="btn btn-primary rounded-xl text-white 
                        hover:bg-primary/80 hover:scale-[1.04] 
                        transition-all duration-200">
                                Interested
                            </button>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    );

};

export default Feed;
