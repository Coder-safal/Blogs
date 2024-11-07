import React from 'react'
import { Link } from 'react-router-dom'

function Posts({ post }) {

  return (
    <Link
      to={{
        pathname: "/cardPost",
      }}
      state={{ post }} // Passing the post data using state
      key={post._id}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img src={`https://imgs.search.brave.com/CxfQiIy7HVP6BXVFDapmVjwgSjvF9XyuTEGNBFqWTAk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc3/MDM0NDAyL3Bob3Rv/L3RyZWVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1VSk5I/a01IeWxXNFh0c2tT/UGZ1OVRuZVZmY2Fh/RFV2T2czVXJTdzdI/cUlVPQ`} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.content.substring(0, 30) + "..."}</p>

      </div>
    </Link>
  )
}

export default Posts