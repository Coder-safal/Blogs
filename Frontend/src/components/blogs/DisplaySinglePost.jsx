import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AunthUsers.jsx';
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';




const DisplaySinglePost = () => {

    const navigate = useNavigate();
    const { authUser } = useAuth();
    const image = "https://imgs.search.brave.com/CxfQiIy7HVP6BXVFDapmVjwgSjvF9XyuTEGNBFqWTAk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc3/MDM0NDAyL3Bob3Rv/L3RyZWVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1VSk5I/a01IeWxXNFh0c2tT/UGZ1OVRuZVZmY2Fh/RFV2T2czVXJTdzdI/cUlVPQ";
    const location = useLocation();
    const { post } = location.state;
    // console.log("authusers in Single Post", authUser.userName);


    const handleDelete = () => {
        console.log("Delete Handle!")
        axios.delete(`/api/blogs/v1/blogsPost/deletePost/${post?._id}`).then((response) => {
            alert("Post Delete Succesfully!");
            navigate("/home");

        }).catch((error) => {
            alert("Error " + error.response.message);

        });
    }

    const handleEdit = () => {
        navigate(`/editPost/${post._id}`, { state: { post } });
    };


    return (
        <div className="container mx-auto px-6 py-12 text-black">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={image}
                    alt={post.title}
                    className="h-[500px] w-full rounded-lg shadow-lg object-cover object-center"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 text-lg mb-6">{post.description}</p>
                    <div className="prose max-w-none">
                        <p>{post.content}</p>
                    </div>

                </div>
                <div className='flex justify-between px-10 py-5'>
                    <div className='flex h-fit items-center'>
                        <button
                            className='w-fit px-14 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-xl'
                        ><AiFillLike /> {/* <AiOutlineLike /> */}</button>
                        <p className='text-[20px] font-serif px-10'>5 likes</p>
                    </div>
                    <div className='flex w-[20%] justify-around'>
                        <MdDelete className='text-3xl' onClick={handleDelete} />
                        <FaEdit className='text-3xl' onClick={handleEdit} />
                    </div>
                    <p className='font-semibold'>By:{authUser?.userName}</p>
                </div>
            </div>
        </div>
    );
};



export default DisplaySinglePost;