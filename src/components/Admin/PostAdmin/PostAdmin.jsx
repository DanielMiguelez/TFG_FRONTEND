import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../../features/posts/postsSlice";
import './PostAdmin.css';

const PostAdmin = () => {
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const onDelete = async (id) => {
        try {
            await dispatch(deletePost(id));
            dispatch(getAllPosts());
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (posts.length === 0) {
        return (
            <div className="no-posts">
                No hay posts disponibles en este momento
            </div>
        );
    }

    return (
        <div className="admin-posts">
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <div className="post-actions">
                            <button 
                                className="delete-button"
                                onClick={() => onDelete(post._id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostAdmin;
