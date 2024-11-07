import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { usePostStore } from '../../statemanagement/GetAllPosts';

function FetchAllUsers() {
    const { posts, setPosts } = usePostStore();
    useEffect(() => {
        axios.get("/api/blogs/v1/blogsPost/getAllPost").then((response) => {

            setPosts(response.data.data);
        }).catch((error) => {
            console.log("Error: " + error.response?.data.message);
        })


    }, [])
}

export default FetchAllUsers