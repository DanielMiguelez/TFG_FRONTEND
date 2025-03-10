import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getAllPosts} from '../../features/posts/postsSlice'
import Post from './Post/Post';

const Posts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
     dispatch(getAllPosts())
    }, [])
    
  return (
    <div>{<Post/>}</div>
  )
}

export default Posts