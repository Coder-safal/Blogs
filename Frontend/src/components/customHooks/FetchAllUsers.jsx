import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { usePostStore } from '../../statemanagement/GetAllPosts';

function FetchAllUsers() {
    const { posts, setPosts } = usePostStore();
    // const [posts, setPosts] = useState([]);
    useEffect(() => {

        console.log("fetch Data call");
        axios.get("/api/blogs/v1/blogsPost/getAllPost").then((response) => {
            console.log("BlogPost res data: ", response.data.data);
            // setPost(response.data.data);
            setPosts(response.data.data);
        }).catch((error) => {
            console.log("Error: " + error.response?.data.message);
        })
        // console.log("post is: ", postsData);

    }, [])
    // return { posts }


}

export default FetchAllUsers