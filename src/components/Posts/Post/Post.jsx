import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import { getAllPosts, like, unlike } from '../../../features/posts/postsSlice'
import { Link } from "react-router-dom";
import { HeartOutlined, DislikeOutlined } from '@ant-design/icons';

const Post = () => {

  const { posts } = useSelector(state => state.posts)
  const dispatch = useDispatch()

  const onLike = async (id) => {
    await dispatch(like(id))
    dispatch(getAllPosts())
  }

  const onUnlike = async (id) => {
    await dispatch(unlike(id))
    dispatch(getAllPosts())
  }

  return (
    <>
      <div className='postParent'>

        <div>
          <div  >{posts.map(post => {
            return (

              <div className='eachPost' key={post._id}>
                <>
                  <Link to={"/post/" + post._id}>
                    <p>{post.title}</p>
                  </Link>
                 
                  {post.image && (
                    <img
                      src={`http://localhost:8000/uploads/${post.image}`}
                      alt="Post"
                      className="post-image"
                    />
                  )}
                  <span>{post.content}</span>
                  
                </>
                
                <span>{post.likes.length} Likes</span>
              
                <div className="buttons">
                <button onClick={() => onLike(post._id)}><HeartOutlined /></button>
              
                <button onClick={() => onUnlike(post._id)}><DislikeOutlined /></button>

                
                </div>
                
                <span>{post.date}</span>
              </div>
            )
          })}</div>
        </div>
      </div>
    </>
  )
}

export default Post