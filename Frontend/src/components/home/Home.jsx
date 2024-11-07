import React from 'react'
import Header from './Header.jsx'
import BlogPosts from '../blogs/BlogPosts.jsx'
import { usePostStore } from '../../statemanagement/GetAllPosts.jsx'

function Home() {

    const { posts } = usePostStore();
    return (
        <>

            <BlogPosts />

        </>
    )
}

export default Home