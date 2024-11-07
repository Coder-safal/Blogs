
import Posts from './Posts.jsx';
import { usePostStore } from '../../statemanagement/GetAllPosts.jsx';

import FetchAllUsers from '../customHooks/FetchAllUsers.jsx';


const BlogPosts = () => {


    FetchAllUsers();
    const { posts } = usePostStore();
    return (
        <div className="container mx-auto px-6 py-12" id="latest-posts">
            <h2 className="text-3xl font-bold text-center mb-8">{(posts.length > 0) ? "Latest Posts" : "No posts Available to Show"}</h2>
            <div className="grid gap-8 lg:grid-cols-3">
                {posts.length > 0 && posts.map((post) => (
                    <Posts key={post?._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default BlogPosts;
