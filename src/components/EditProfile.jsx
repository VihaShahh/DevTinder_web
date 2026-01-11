import React, { useState } from 'react';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSave = () => {
        if (!firstName || !lastName || !age || !gender || !about || !photoUrl) {
            setErrorMsg("Please fill all fields");
            return;
        }

        setErrorMsg("");

        console.log("Profile Updated:", {
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4 py-10 flex justify-center items-start">

                <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300 rounded-2xl backdrop-blur-xl">
                    <div className="card-body space-y-4">


                        <h2 className="text-3xl font-bold text-center pb-2 tracking-wide">
                            Edit Profile
                        </h2>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">First Name</legend>
                            <input
                                type="text"
                                value={firstName}
                                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your first name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">Last Name</legend>
                            <input
                                type="text"
                                value={lastName}
                                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your last name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">Age</legend>
                            <input
                                type="number"
                                value={age}
                                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter your age"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">Gender</legend>
                            <select
                                className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">Photo URL</legend>
                            <input
                                type="text"
                                value={photoUrl}
                                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter a photo URL"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm font-semibold opacity-80">About</legend>
                            <textarea
                                className="textarea textarea-bordered w-full rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Write something about yourself..."
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                        </fieldset>


                        {errorMsg && (
                            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                        )}

                        <button
                            className="btn btn-primary w-full rounded-xl mt-3 text-white font-semibold tracking-wide 
                        hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-md"
                            onClick={handleSave}
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditProfile;
