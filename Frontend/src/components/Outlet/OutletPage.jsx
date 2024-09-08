import React from 'react'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
// import { Outlet } from 'react-router'
import { Outlet } from 'react-router-dom'


function OutletPage() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default OutletPage;