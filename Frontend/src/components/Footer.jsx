import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
    return (
        <>
            <div className='h-[500px] w-[100%] bg-slate-600 text-white flex justify-center'>
                <div className='sm:w-[1000px] h-[200px] sm:flex sm:justify-between items-center'>

                    <div className="p-4" style={{ color: '#1877F2' }}>
                        <a href="facebook.com">
                            <i className="fa-brands fa-facebook-f text-3xl"></i>
                        </a>
                    </div>

                    <div className="p-4" style={{ color: '#181717' }}>
                        <a href="github.com/Coder-safal">
                            <i className="fa-brands fa-github text-3xl"></i>
                        </a>
                    </div>
                    <div class="bg-gradient-to-r from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] p-4 rounded-full">
                        <i class="fa-brands fa-instagram text-white text-3xl"></i>
                    </div>
                    <div className="p-4" style={{ color: '#000000' }}>
                        <a href="http://github.com/Coder-safal"><i class="fa-brands fa-x text-3xl"></i></a>
                    </div>


                    <div className="p-4" style={{ color: '#650c8c' }}>
                        <a href="http://github.com/Coder-safal"><i class="fa-brands fa-viber text-3xl text-blue-500"></i></a>
                    </div>
                    <div className="p-4" style={{ color: '#25F4EE' }}>
                        <a href="http://github.com/Coder-safal"><i class="fa-brands fa-tiktok text-3xl text-black"></i></a>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer