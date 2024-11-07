import axios from 'axios'
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AunthUsers'

function ChangeUserName() {

    const { authUser, setAuthUsers } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log("Data: ", data)
        if (data.newUserName === data.oldUserName) {
            alert("old and new Email must be different!");
            return;

        }
        if (!data.newUserName) {
            alert("New Email is required Fields!")
            return;
        }

        axios.patch("/api/blogs/v1/users/ChangeUserName", {
            oldUserName: data.oldUserName,
            newUserName: data.newUserName,

        }).then((response) => {
            if (response.data) {
                setAuthUsers(response?.data.data);
                alert("Change succesfully!")
                navigate("/home")
            }
        }).catch((error) => {
            alert("Errors: " + error.response.data.message);
        })
    }




    return (
        <>
            <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                <div className='h-fit w-fit flex flex-col items-center gap-4 '>
                    <h1 className='font-semibold text-2xl text-blue-600 '>Change Username</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-3 bg-slate-700 px-7 py-8 rounded-lg shadow-md'>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="text" className="grow" placeholder="Old UserName"
                                {...register("oldUserName", { required: true })}
                            />
                        </label>
                        {errors.oldUserName && <span className='text-[16px] text-red-700'>**This field is required**</span>}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="text" className="grow" placeholder="New Username"
                                {...register("newUserName", { required: true })}
                            />
                        </label>
                        {errors.newUserName && <span className='text-[16px] text-red-700'>**This field is required**</span>}
                        <div className='w-full'>
                            <input type="submit" value="Update"
                                className='w-full h-fit px-10 py-2  bg-indigo-600 rounded-lg hover:bg-indigo-700' />
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ChangeUserName