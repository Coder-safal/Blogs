import axios from 'axios'
import React, { useEffect } from 'react'
import { useAuth } from './AunthUsers.jsx'

function CheckUsersLogin() {
    const { authUser, setAuthUsers } = useAuth();
    useEffect(() => {
        axios.get("/api/blogs/v1/users/checkUserLogin").then((response) => {
            console.log("Check Users Login: ", response.data.data);
            setAuthUsers(response.data.data);

        }).catch((error) => {
            localStorage.removeItem("user");
            console.log("Error: " + error.response?.data.message);
        })


    }, [setAuthUsers])

    return { authUser };
}

export default CheckUsersLogin