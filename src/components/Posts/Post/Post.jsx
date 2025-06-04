import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import { getAllPosts, like, unlike } from '../../../features/posts/postsSlice'
import { Link } from "react-router-dom";
import { HeartOutlined, DislikeOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const Post = () => {
  const { posts } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      icon: type === 'success' ? (
        <CheckCircleFilled 
          style={{ 
            color: '#008000 !important',
            fontSize: '24px',
          }}
          className="success-icon"
        />
      ) : (
        <CloseCircleFilled 
          style={{ 
            color: '#ff4d4f',
            fontSize: '24px',
          }}
        />
      ),
      placement: 'topRight',
      duration: 2,
      className: type === 'success' ? 'custom-success-notification' : '',
      style: {
        borderRadius: '8px',
      },
    });
  };

  const onLike = async (id, title) => {
    try {
      await dispatch(like(id)).unwrap();
      await dispatch(getAllPosts());
      showNotification(
        'success',
        '¡Me gusta!',
        `Has dado like al post "${title}"`
      );
    } catch (error) {
      showNotification(
        'error',
        'Error',
        'No se pudo dar like al post'
      );
    }
  }

  const onUnlike = async (id, title) => {
    try {
      await dispatch(unlike(id)).unwrap();
      await dispatch(getAllPosts());
      showNotification(
        'info',
        'Like removido',
        `Has quitado tu like del post "${title}"`
      );
    } catch (error) {
      showNotification(
        'error',
        'Error',
        'No se pudo quitar el like del post'
      );
    }
  }

  return (
    <>
      {contextHolder}
      {posts.map(post => (
        <div className='postParent' key={post._id}>
          <div className='eachPost'>
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
            <span>{post.likes.length} Likes</span>
            
            <div className="buttons">
              <button onClick={() => onLike(post._id, post.title)}><HeartOutlined /></button>
              <button onClick={() => onUnlike(post._id, post.title)}><DislikeOutlined /></button>
            </div>
            
            <span>{post.date}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Post