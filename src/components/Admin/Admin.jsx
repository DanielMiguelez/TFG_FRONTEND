import PostAdmin from "./PostAdmin/PostAdmin"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";

const Admin = () => {
    const dispatch = useDispatch();
    
    const getPosts = () => {
        dispatch(getAllPosts());
    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div>
            <h1>Admin</h1>
            <PostAdmin />
        </div>
    )
}

export default Admin