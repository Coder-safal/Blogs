import React from 'react'
import { NavLink } from 'react-router-dom'
function Card({ value }) {
    return (
        <>
            <NavLink to="blogPage" className="" key={value.id} >
                <div className='w-[300px] h-[100px] bg-blue-300  my-2 text-start'>
                    <h1 className='px-10 pt-2 overflow-hidden text-ellipsis whitespace-nowrap'>{value.title}</h1>
                    <h3 className='px-10 pt-2' >{value.title}</h3>
                </div>
            </NavLink >
        </>
    )
}

export default Card