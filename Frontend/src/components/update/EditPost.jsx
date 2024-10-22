import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const EditPost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state; // Get post data from the state

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleUpdate = () => {
        axios.patch(`/api/blogs/v1/blogsPost/updatePost/${post._id}`, {
            title,
            description: content
        }).then(() => {
            alert("Post updated successfully!");
            navigate("/home"); // Redirect back to home after update
        }).catch((error) => {
            alert("Error updating post: " + error.response.data.message);
        });
    };

    return (
        <div className="container mx-auto px-6 py-12 text-black">
            <h1 className="text-2xl font-bold mb-4 text-white text-center">Edit Post</h1>
            <input
                className="w-full mb-4 p-2 border bg-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="w-full mb-4 p-2 border bg-white min-h-fit"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <button
                onClick={handleUpdate}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            >
                Update Post
            </button>
        </div>
    );
};

export default EditPost;
