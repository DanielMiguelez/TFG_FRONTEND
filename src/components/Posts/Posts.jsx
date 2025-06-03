import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getAllPosts} from '../../features/posts/postsSlice'
import Post from './Post/Post';
import './Posts.css'

const Posts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])
    
    return (
        <div className='posts-container'>
            <Post />
        </div>
    )
}

export default Posts