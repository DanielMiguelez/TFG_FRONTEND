import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import "./PostDetail.css"

const PostDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch()

    const { post } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getById(id));
    }, []);

    return (

        <div  className="container">

            <p className="title">{post?.title}</p>

            <img
                      src={`http://localhost:8000/uploads/${post.image}`}
                      alt="Post"
                      className="post-image"
                    />

            <p className="content">{post?.content}</p>

            <p className="date">{post?.date}</p>

        </div>

    );

};

export default PostDetail;