import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../features/posts/postsSlice";
import { useEffect } from "react";

const PostDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch()

    const { post } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getById(id));
    }, []);

    return (

        <div>

            <h1>PostDetail</h1>

            <p>{post?.title}</p>

            <p>{post?.content}</p>

            <p>{post?.date}</p>

        </div>

    );

};

export default PostDetail;