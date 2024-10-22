import React, { useEffect, useState } from 'react';

import Posts from './Posts.jsx';
import axios from 'axios';
import { usePostStore } from '../../statemanagement/GetAllPosts.jsx';

import FetchAllUsers from '../customHooks/FetchAllUsers.jsx';


const BlogPosts = () => {

    // const { posts } = FetchAllUsers();
    FetchAllUsers();
    const { posts } = usePostStore();
    // console.log("postData: ", po);
    console.log("posts: ", posts);


    return (
        <div className="container mx-auto px-6 py-12" id="latest-posts">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>
            <div className="grid gap-8 lg:grid-cols-3">
                {posts.length > 0 && posts.map((post) => (
                    <Posts key={post?.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default BlogPosts;
