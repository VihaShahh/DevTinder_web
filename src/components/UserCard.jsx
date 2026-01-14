import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-2xl rounded-2xl border border-base-300 
                    hover:shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">

            <figure className="rounded-t-2xl overflow-hidden">
                <img
                    src={user?.photoUrl || "https://via.placeholder.com/300"}
                    alt={`${user?.firstName || "User"} ${user?.lastName || "Name"}`}
                    className="w-full h-64 object-cover"
                />
            </figure>

            <div className="card-body space-y-3">

                <h2 className="card-title text-2xl font-bold">
                    {user?.firstName || "User"} {user?.lastName || "Name"}
                </h2>

                {(user?.age || user?.gender) && (
                    <p className="text-sm opacity-70">
                        {user?.age && user.age}
                        {user?.age && user?.gender ? " • " : ""}
                        {user?.gender && user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                    </p>
                )}

                <p className="opacity-80">{user?.about || "This user has no description."}</p>

                {user?.skills?.length > 0 && (
                    <div>
                        <h3 className="font-semibold">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.skills.map((skill, index) => (
                                <span key={index} className="badge badge-primary badge-outline px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="card-actions justify-center mt-4 gap-5">
                    <button className="btn btn-outline btn-error rounded-xl">Ignore</button>
                    <button className="btn btn-primary rounded-xl text-white">Interested</button>
                </div>

            </div>
        </div>
    );
};

export default UserCard;
