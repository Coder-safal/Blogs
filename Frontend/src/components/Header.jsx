import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <div className='h-[100px] w-[100%] bg-slate-600 sticky top-0 flex text-white justify-between items-center'>
                <div className='h-[80px] pl-10'>
                    <img src="https://images-platform.99static.com//_kcamHLCfSPOt7e9zH08t7UbxzI=/342x1130:958x1746/fit-in/500x500/99designs-contests-attachments/77/77610/attachment_77610300"
                        className='h-[80px] rounded-full'
                        alt="" />
                </div>
                {/* ${isActive ? "text-orange-300-700" : "text-gray-700"} */}
                <div className='w-[30%]  flex justify-around'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-300" : "text-white"} lg:hover:text-blue-400 `
                        }
                    > Home</NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-300" : "text-white"} lg:hover:text-blue-400 `
                        }
                    > About</NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-300" : "text-white"} lg:hover:text-blue-400 `
                        }
                    > Contact</NavLink>

                </div>

                <div className='pr-10 w-[20%] flex justify-evenly'>
                    <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-300" : "text-white"} lg:hover:text-blue-400 `
                        }
                    >signin</NavLink>
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            ` px-3 py-1.5 rounded-sm ${isActive ? "text-orange-300" : "text-white"} lg:hover:text-blue-400 `
                        }
                    >Signup</NavLink>
                </div>

            </div>
        </>
    )
}

export default Header