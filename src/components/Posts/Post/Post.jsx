import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import { getAllPosts, like } from '../../../features/posts/postsSlice'
import { Link } from "react-router-dom";
const Post = () => {

  const { posts } = useSelector(state => state.posts)

  const dispatch = useDispatch()

  const onLike = async (id) =>{
    await dispatch(like(id))
    dispatch(getAllPosts())
  }

  return (
    <>
      <div className='postParent'>
        <h3>Posts</h3>

        <div >
          <div  >{posts.map(post => {
            return (

              <div className='eachPost' key={post._id}>
                <>
                  <Link to={"/post/" + post._id}>
                    <p>{post.title}</p>
                  </Link>
                  <br />
                  <span>{post.content}</span>
                  <br />
                  <span>{post.date}</span>
                </>
                <br />
                <span>{post.likes.length} Likes</span>
                <br />
                <button onClick={() => onLike(post._id)}>Like</button>
              </div>
            )
          })}</div>
        </div>
      </div>
    </>
  )
}

export default Post