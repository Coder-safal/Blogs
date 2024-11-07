
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AunthUsers.jsx';
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';



function CardPost() {

    const navigate = useNavigate();
    const { authUser } = useAuth();
    const image = "https://imgs.search.brave.com/CxfQiIy7HVP6BXVFDapmVjwgSjvF9XyuTEGNBFqWTAk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc3/MDM0NDAyL3Bob3Rv/L3RyZWVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1VSk5I/a01IeWxXNFh0c2tT/UGZ1OVRuZVZmY2Fh/RFV2T2czVXJTdzdI/cUlVPQ";
    const location = useLocation();
    const { post } = location.state;


    const handleDelete = () => {
        axios.delete(`/api/blogs/v1/blogsPost/deletePost/${post?._id}/userId/${post.author?._id}`).then((response) => {
            alert("Post Delete Succesfully!");
            navigate("/home");

        }).catch((error) => {
            alert("Error: " + error.response.data.message);

        });
    }

    const handleEdit = () => {
        navigate(`/editPost/${post._id}`, { state: { post } });
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="card bg-base-100 w-[90%] shadow-xl mx-auto">
                    <div className="card-body">
                        <h2 className="card-title text-justify">{post.title}</h2>
                        <p className=' text-justify'>{post.content}</p>

                        <div className='w-[100%] flex  items-center py-4 mt-10  border border-white'>
                            <div className='flex h-fit items-center ml-28'>
                                <button
                                    className='w-fit flex  text-center px-7 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-xl'
                                > <span className='text-[16px] font-semibold px-2'> 5</span> <AiFillLike /> {/* <AiOutlineLike /> */}</button>
                                {/* <p className='text-[20px]  px-5'>5 likes</p> */}
                            </div>
                            <div className='flex w-[20%] justify-around ml-36'>
                                <MdDelete className='text-4xl p-2 rounded-full hover:bg-slate-700' onClick={handleDelete} />
                                <FaEdit className='text-4xl p-2 rounded-full hover:bg-slate-700' onClick={handleEdit} />
                            </div>
                            <p className='font-semibold text-center'>By:{post?.author.userName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPost