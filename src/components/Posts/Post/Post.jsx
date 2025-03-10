import React from 'react'
import { useSelector } from 'react-redux'
import './Post.css'

const Post = () => {

    const {posts} = useSelector (state => state.posts)

  return (
    <>
    <div className='postParent'>
    <h3>Posts</h3>

    <div >
        <div  >{posts.map (post => {
            return (
                <div className='eachPost'>
                <>
                <span>{post.title}</span>
                <br />
                <span>{post.content}</span>
                <br />
                <span>{post.date}</span>
                </>
                <br />
                <span>{post.likes.length} Likes</span>
                </div>
            )
        })}</div>
    </div>
    </div>
    </>
  )
}

export default Post