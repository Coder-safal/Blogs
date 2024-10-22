import React from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AunthUsers'
import Logout from '../logout/Logout';
import { IoSettings } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


function Header() {
    const { authUser } = useAuth();
    const url = null;
    return (
        <>
            <div className='flex h-[80px]  w-[100%] bg-slate-800 text-white sticky top-0'>


                <div className=' flex w-[80%] items-center justify-evenly '>
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `${!isActive ? "bg-blue-500" : "bg-orange-500"} py-1 px-5 text-center rounded-sm`
                        }
                    >
                        Home
                    </NavLink>
                    {!authUser ?

                        <NavLink
                            to={"/login"}
                            className={({ isActive }) =>
                                `${!isActive ? "bg-blue-500" : "bg-orange-500"} py-1 px-5 text-center rounded-sm`
                            }
                        >
                            Log In
                        </NavLink> :
                        <NavLink
                            to={"/logout"}
                            className={({ isActive }) =>
                                `${!isActive ? "bg-blue-500" : "bg-orange-500"} py-1 px-5 text-center rounded-sm`
                            }
                        >
                            Log Out
                        </NavLink>
                    }
                    {
                        !authUser ?
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `${!isActive ? "bg-blue-500" : "bg-orange-500"} py-1 px-5 text-center rounded-sm`
                                }
                            >
                                Signup
                            </NavLink> : ""
                    }
                    {
                        authUser ?
                            <NavLink
                                to={"/uploadPost"}
                                className={({ isActive }) =>
                                    `${!isActive ? "bg-blue-500" : "bg-orange-500"} py-1 px-5 text-center rounded-sm`
                                }
                            >
                                Upload Post
                            </NavLink> : ""
                    }


                </div>
                {authUser ?

                    <div className='w-[20%]  px-5 flex flex-row-reverse justify-end gap-2'>
                        <details className="dropdown">
                            <summary className="btn  text-2xl p-3 m-1"><IoSettings />
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><Link className='font-semibold'>Change Profile</Link></li>
                                <li><Link to={"/changePassword"} className='font-semibold'>Change Password</Link></li>
                                <li><Link className='font-semibold'>Change Username</Link></li>
                                <li><Link className='font-semibold'>Change Email</Link></li>
                                <li><Link to="/logout" className='font-semibold'>Log Out</Link></li>
                            </ul>
                        </details>
                        {/*  <div className="avatar">
                            <div className="w-14 rounded-full border border-1 bg-white">
                                <img src="" />
                            </div>
                        </div>*/}
                    </div> : ""
                }
            </div>
        </>
    )
}

export default Header