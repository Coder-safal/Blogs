import axios from 'axios';
import React, { useEffect } from 'react'
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AunthUsers';


function Logout() {
    const navigate = useNavigate();
    const { authUser, setAuthUsers } = useAuth();
    useEffect(() => {


        axios.get("/api/blogs/v1/users/logout").then((response) => {
            if (response.data) {
                localStorage.removeItem("user");
                setAuthUsers(null);
                alert(response.data?.message);
                navigate("/");

            }
        }).catch((error) => {
            localStorage.removeItem("user");
            alert("Error: " + error.response.data.message);
            navigate("/home");
            setAuthUsers(null);
            // alert("Please try again!");
        })


    }, [])

}

export default Logout