import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className='h-[100px] w-[100%] bg-slate-600 text-white flex justify-between'>
                <div className='sm:w-[40%]  sm:flex sm:justify-evenly items-center'>

                    <div className="p-4" style={{ color: '#1877F2' }}>
                        <a href="facebook.com">
                            <i className="fa-brands fa-facebook-f text-3xl"></i>
                        </a>
                    </div>

                    <div className="p-4" style={{ color: '#181717' }}>
                        <a href="github.com/Coder-safal">
                            <i className="fa-brands fa-github text-2xl"></i>
                        </a>
                    </div>
                    <div className="p-4" style={{ color: '#000000' }}>
                        <a href="http://github.com/Coder-safal"><i className="fa-brands fa-x text-2xl"></i></a>
                    </div>


                    <div className="p-4" style={{ color: '#650c8c' }}>
                        <a href="http://github.com/Coder-safal"><i className="fa-brands fa-viber text-2xl text-blue-500"></i></a>
                    </div>
                    <div className="p-4" style={{ color: '#25F4EE' }}>
                        <a href="http://github.com/Coder-safal"><i className="fa-brands fa-tiktok text-2xl text-black"></i></a>

                    </div>

                </div>
                <div className='w-[30%] h-[100px]  flex justify-around items-center pr-10'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-600":"text-white"} lg:hover:text-blue-400 `
                        }
                    > Home</NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive?"text-orange-600":"text-white"} lg:hover:text-blue-400 `
                        }
                    > About</NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive?"text-orange-600":"text-white"} lg:hover:text-blue-400 `
                        }
                    > Contact</NavLink>

                </div>
            </div>
        </>
    )
}

export default Footer