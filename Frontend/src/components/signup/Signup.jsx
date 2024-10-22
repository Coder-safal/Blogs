import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Login from '../login/Login.jsx';

function Signup() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        const userInfo = {
            userName: data.userName,
            password: data.password,
            email: data.email
        }
        axios.post("/api/blogs/v1/users/register", userInfo).then((response) => {

            // console.log("users register data is: ", response.data.message);
            if (response.data) {
                alert(response.data.message);
                navigate("/login");

            }
        }).catch((error) => {
            console.log(error.response.data.message);
            alert("Errors: " + error.response.data.message)
        })

    }


    return (
        <>
            <div className='w-[100%]  h-screen flex justify-center items-center'>

                <div className='w-fit p-10 bg-slate-900 flex flex-col justify-center items-center gap-6 shadow-lg rounded-lg'>
                    <h1 className='font-bold text-3xl text-white'>Signup Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-4'>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Username"
                                {...register("userName", { required: true })}
                            />
                        </label>
                        {errors.userName && <span className='text-red-600'>This field is required</span>}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email"
                                {...register("email", { required: true })}
                            />
                        </label>
                        {errors.email && <span className='text-red-600'>This field is required</span>}

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
                            <input type="password" className="grow" placeholder="password" {...register("password", { required: true })} />
                        </label>
                        {errors.password && <span className='text-red-600'>This field is required</span>}
                        <div className='w-full flex flex-col justify-center items-center space-y-2'>
                            <input type="submit" value="Sign Up" className='bg-indigo-600 w-full py-2 rounded-lg hover:bg-indigo-700' />
                            <p>Already have an account? < Link to={"/login"} className='text-blue-500 font-semibold underline'> Login</Link > </p>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup