import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={user?.profileImage}
                        alt="Profile"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.name || "User Name"}</h2>
                    <p>{user?.bio || "No bio available."}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">View Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
