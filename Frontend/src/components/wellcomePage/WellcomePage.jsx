import React from 'react'
import { Link } from 'react-router-dom'

function WellcomePage() {
    return (
        <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 h-screen">
                <div className='flex justify-center items-center'>

                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Welcome to Our Blog
                        </h1>
                        <p className="text-lg md:text-2xl mb-8">
                            Explore insights, stories, and updates from the world of technology.
                        </p>
                        <Link
                            to={"/home"}
                            className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                        >
                            Get Start
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default WellcomePage