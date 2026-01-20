import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender?.toLowerCase() || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [skills] = useState(user.skills || []);
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const payload = {};

            if (firstName !== user.firstName) payload.firstName = firstName;
            if (lastName !== user.lastName) payload.lastName = lastName;
            if (age !== user.age) payload.age = age;
            if (gender !== (user.gender || "")) payload.gender = gender;
            if (about !== user.about) payload.about = about;
            if (photoUrl !== user.photoUrl) payload.photoUrl = photoUrl;

            const res = await axios.patch(
                "/api/profile/update",
                payload,
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));

            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);

        } catch (err) {
            console.error("Error saving profile:", err);

            const backendMsg = err?.response?.data?.message || "Failed to save profile!";
            setErrorMessage(backendMsg);

            setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4 py-10 flex justify-center items-start">
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">

                <div className="w-full md:w-1/2 flex flex-col items-center">
                    {errorMessage && (
                        <div className="mb-4 w-full flex justify-center">
                            <div className="alert alert-error shadow-lg rounded-xl text-center max-w-md">
                                <span className="font-semibold">{errorMessage}</span>
                            </div>
                        </div>
                    )}

                    {showToast && (
                        <div className="mb-4 w-full flex justify-center">
                            <div className="alert alert-success shadow-lg rounded-xl text-center max-w-md">
                                <span className="font-semibold">Profile saved successfully!</span>
                            </div>
                        </div>
                    )}

                    <div className="card w-full bg-base-100 shadow-2xl border border-base-300 rounded-2xl backdrop-blur-xl">
                        <div className="card-body space-y-4">
                            <h2 className="text-3xl font-bold text-center pb-2 tracking-wide">Edit Profile</h2>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">First Name</legend>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input input-bordered w-full rounded-xl"
                                    placeholder="Enter your first name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">Last Name</legend>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input input-bordered w-full rounded-xl"
                                    placeholder="Enter your last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">Age</legend>
                                <input
                                    type="number"
                                    value={age}
                                    className="input input-bordered w-full rounded-xl"
                                    placeholder="Enter your age"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">Gender</legend>
                                <select
                                    className="select select-bordered w-full rounded-xl"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">Photo URL</legend>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input input-bordered w-full rounded-xl"
                                    placeholder="Enter a photo URL"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm font-semibold opacity-80">About</legend>
                                <textarea
                                    className="textarea textarea-bordered w-full rounded-xl h-28"
                                    placeholder="Write something about yourself..."
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                ></textarea>
                            </fieldset>

                            <button
                                className="btn btn-primary w-full rounded-xl mt-3 text-white font-semibold"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center items-start">
                    <div className="card bg-base-100 w-96 shadow-2xl rounded-2xl border border-base-300 
                        hover:shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <figure className="rounded-t-2xl overflow-hidden">
                            <img
                                src={photoUrl || "https://via.placeholder.com/300"}
                                alt={`${firstName} ${lastName}`}
                                className="w-full h-64 object-cover"
                            />
                        </figure>

                        <div className="card-body space-y-3">
                            <h2 className="card-title text-2xl font-bold">
                                {firstName || "User"} {lastName || "Name"}
                            </h2>

                            {(age || gender) && (
                                <p className="text-sm opacity-70">
                                    {age && age}
                                    {age && gender ? " • " : ""}
                                    {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </p>
                            )}

                            <p className="opacity-80">{about || "This user has no description."}</p>

                            {skills?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold">Skills</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {skills.map((skill, index) => (
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
                </div>

            </div>
        </div>
    );
};

export default EditProfile;
