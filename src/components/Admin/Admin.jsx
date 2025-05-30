import PostAdmin from "./PostAdmin/PostAdmin"
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import './Admin.css';

const Admin = () => {
    const dispatch = useDispatch();
    
    const getPosts = () => {
        dispatch(getAllPosts());
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Tu zona de administrador</h1>
            </div>
            <div className="admin-section">
                <PostAdmin />
            </div>
        </div>
    )
}

export default Admin