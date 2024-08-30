import React from 'react'

function Header() {
    return (
        <>
            <div className='text-black  bg-slate-600 h-16 flex justify-between'>
                <div className='h-[90px] w-[90px] border-black border-2 rounded-full flex justify-center items-center '>
                    <img src="../public/image1.png" alt="safal"  className='h-[80px] w-[80px] rounded-full
                     items-center
                    '/>
                </div>
                <div className='sm:w-[350px] flex justify-between pr-4 items-center'>
                    <li className='max-h-[50px] bg-cyan-500 px-5 list-none rounded-sm py-1.5 text-center
                     hover:bg-cyan-600 hover:text-white
                    '>Signup</li>
                    <li className='max-h-[50px] bg-cyan-500 px-5 list-none rounded-sm py-1.5 text-center
                     hover:bg-cyan-600 hover:text-white
                    '>login</li>
                </div>
            </div>
        </>
    )
}

export default Header