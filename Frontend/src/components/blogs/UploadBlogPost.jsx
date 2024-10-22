import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AunthUsers'
import axios from 'axios';


function UploadBlogPost() {
    // const { authUser, setAuthUsers } = useAuth();
    const authUser = JSON.parse(localStorage.getItem("user"));
    console.log("Auth users in uploadpost: ", authUser?.userName);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        console.log(data)



        axios.post("/api/blogs/v1/blogsPost/uploadPost", {
            title: data.title,
            content: data.content,
        }).then((response) => {
            if (response) {
                console.log("response uploadPost: ", response.data.data.message);
                alert("Blogs upload succesfully!");
                navigate("/home");
            }
        }).catch((error) => {
            alert("Error " + error.response.data.message);
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        alert("Cancel upload post!");
        navigate("/home");
    }

    return (

        <>
            <div className='min-h-screen w-[100%] flex justify-center'>


                <div className=' bg-white py-10 px-20 text-black w-[900px] shadow-xl rounded-lg  flex flex-col gap-4'>
                    <h1 className='text-3xl text-blue-600 font-bold text-center'>Create Post</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex gap-4'>
                            <label htmlFor="author">Author:
                                <input type="text" className='px-2 bg-transparent outline-none font-semibold'
                                    readOnly
                                    value={authUser?.userName}
                                />
                            </label>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="title">Title
                                <input type="text" className='px-2 py-2 my-2 bg-transparent border w-full border-black cursor-text'
                                    {...register("title", { required: true })}
                                />
                            </label>
                            {errors.title && <span className='text-red-800 text-[16px]'>**This field is required**</span>}
                        </div>
                        <div className='my-3'>
                            <label htmlFor="content"
                            >Content
                                <textarea name="textarea" rows={10} className='py-2 mt-2 px-2 w-[100%] bg-white text-black border border-black'
                                    {...register("content", { required: true })}
                                ></textarea>
                            </label>
                            {errors.content && <span className='text-red-700 text-[16px]'>**This field is required**</span>}
                        </div>
                        <div className='flex  justify-around'>
                            <div>
                                <input type="submit" value="Upload Post"
                                    className='bg-indigo-500 w-fit text-white rounded-sm font-semibold py-2 px-10'
                                />
                            </div>
                            <div>
                                <button onClick={handleCancel}
                                    className='bg-blue-500 w-fit text-white rounded-sm font-semibold py-2 px-10'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default UploadBlogPost