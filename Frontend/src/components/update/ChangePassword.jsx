import axios from 'axios'
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router'

function ChangePassword() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log("Data: ", data)
        if (data.newPassword === data.oldPassword) {
            alert("old and new Password must be different!");
            return;
        }

        if (data.newPassword === data.confirmPassword) {
            axios.patch("/api/blogs/v1/users/changePassword", {
                oldpassword: data.oldPassword,
                newpassword: data.newPassword,

            }).then((response) => {
                if (response.data) {
                    console.log("Response is: ", response.data)
                    alert("Change succesfully!")
                    navigate("/home")
                }
            }).catch((error) => {
                alert("Errors: " + error.response.data.message);
            })
        }

    }


    return (
        <>
            <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                <div className='h-fit w-fit flex flex-col items-center gap-4 '>
                    <h1 className='font-semibold text-2xl text-blue-600 '>Change Password</h1>
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
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="Old-password"
                                {...register("oldPassword", { required: true })}
                            />
                        </label>
                        {errors.oldPassword && <span className='text-[16px] text-red-700'>**This field is required**</span>}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="New-Password"
                                {...register("newPassword", { required: true })}
                            />
                        </label>
                        {errors.newPassword && <span className='text-[16px] text-red-700'>**This field is required**</span>}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="Confirm Password"
                                {...register("confirmPassword", { required: true })}
                            />
                        </label>
                        {errors.confirmPassword && <span className='text-[16px] text-red-700'>**This field is required**</span>}
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

export default ChangePassword