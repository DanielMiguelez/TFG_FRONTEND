import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../../features/posts/postsSlice";

const PostAdmin = () => {
    const { posts} = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const onDelete = async (id) => {
        try {
            await dispatch(deletePost(id));
            dispatch(getAllPosts());
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const postsAdmin = posts.map((post) => {
        return (
            <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                    <button onClick={() => onDelete(post._id)}>Delete</button>
            </div>
        );
    });

    return (
        <div className="admin-posts">
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                <div className="posts-container">{postsAdmin}</div>
            )}
        </div>
    );
};

export default PostAdmin;
