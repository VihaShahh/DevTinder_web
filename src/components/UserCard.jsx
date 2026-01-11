import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm rounded-xl">
            <figure className="rounded-t-xl overflow-hidden">
                <img
                    src={user?.photoUrl || "https://via.placeholder.com/300"}
                    alt="Profile"
                    className="w-full h-64 object-cover"
                />
            </figure>

            <div className="card-body space-y-2">
                <h2 className="card-title">
                    {user?.firstName || "User"} {user?.lastName || "Name"}
                </h2>

                {user?.age && (
                    <p className="text-sm opacity-80">
                        <strong>Age:</strong> {user.age}
                    </p>
                )}

                {user?.gender && (
                    <p className="text-sm opacity-80">
                        <strong>Gender:</strong> {user.gender}
                    </p>
                )}


                <p>{user?.about || "No bio available."}</p>


                {user?.skills?.length > 0 && (
                    <div>
                        <strong>Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="badge badge-primary badge-outline px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="card-actions justify-end pt-3">
                    <button className="btn btn-primary">View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
