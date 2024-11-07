import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/AunthUsers.jsx';

function UserInfo() {
    const { authUser } = useAuth();


    if (!authUser) {
        return <p className="text-center text-lg font-semibold">Please log in to view user information.</p>;
    }

    return (
        <div className="container mx-auto mt-10 p-5 max-w-lg bg-white shadow-md rounded-lg">
            <div className="flex justify-center mb-5">
                {authUser.profilePic ? (
                    <img src={authUser.profilePic} alt="User Avatar" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                    <FaUserCircle className="text-6xl text-gray-500" />
                )}
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                {/* <h1 className="text-2xl font-semibold mb-3">{authUser.name}</h1> */}
                <p className="text-gray-600 mb-2">Email: {authUser.email}</p>
                <p className="text-gray-600 mb-2">Username: {authUser.userName}</p>
                {/* Add other user information here */}
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-primary">Edit Profile</button>
            </div>
        </div>
    );
}

export default UserInfo;
