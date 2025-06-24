import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import { getAllPosts, like, unlike, insertComment } from '../../../features/posts/postsSlice'
import { Link } from "react-router-dom";
import { HeartOutlined, DislikeOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const Post = () => {
  const { posts } = useSelector(state => state.posts)
  const [comments, setComments] = useState({});
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const showSuccessNotification = (message, description) => {
    api.success({
      message,
      description,
      icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
      placement: 'topRight',
      duration: 3,
    });
  };

  const showErrorNotification = (message, description) => {
    api.error({
      message,
      description,
      icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />,
      placement: 'topRight',
      duration: 3,
    });
  };

  const onLike = async (id) => {
    try {
      await dispatch(like(id)).unwrap();
      dispatch(getAllPosts());
      showSuccessNotification('Éxito', 'Has dado like al post correctamente');
    } catch (error) {
      showErrorNotification('Error', 'Ya diste like a este post');
    }
  }

  const onUnlike = async (id) => {
    try {
      await dispatch(unlike(id)).unwrap();
      dispatch(getAllPosts());
      showSuccessNotification('Éxito', 'Has quitado el like del post');
    } catch (error) {
      showErrorNotification('Error', 'No se pudo quitar el like');
    }
  }

  const handleSubmitComment = async (postId, e) => {
    e.preventDefault();
    const commentContent = comments[postId]?.trim();
    
    if (!commentContent) {
      showErrorNotification('Error', 'El comentario no puede estar vacío');
      return;
    }

    try {
      await dispatch(insertComment({
        postId,
        comment: commentContent  
      })).unwrap();
      
      setComments(prev => ({
        ...prev,
        [postId]: ''
      }));
      
      showSuccessNotification('Éxito', 'Tu comentario se ha añadido correctamente');
      dispatch(getAllPosts());
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'No se pudo añadir el comentario';
      showErrorNotification('Error', errorMessage);
    }
  };

  const handleCommentChange = (postId, value) => {
    setComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

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
                src={`https://tfg-backend-xgxu.vercel.app/uploads/${post.image}`}
                alt="Post"
                className="post-image"
              />
            )}
            <span>{post.content}</span>
            <span>{post.likes.length} Likes</span>
            
            <div className="buttons">
              <button onClick={() => onLike(post._id)}><HeartOutlined /></button>
              <button onClick={() => onUnlike(post._id)}><DislikeOutlined /></button>
            </div>
            
            <span>{post.date}</span>

            {post.reviews && post.reviews.length > 0 && (
              <div className="comments-section">
                <h4>Comentarios:</h4>
                {post.reviews.map((review, index) => (
                  <div key={index} className="comment">
                    <p className="comment-content">{review.comment}</p>
                    <span className="comment-author">Por: {review.userId?.name || 'Usuario'}</span>
                    <span className="comment-date">
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                     <button ><HeartOutlined /></button>
              <button><DislikeOutlined /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={(e) => handleSubmitComment(post._id, e)} className="comment-form">
            <textarea
              value={comments[post._id] || ''}
              onChange={(e) => handleCommentChange(post._id, e.target.value)}
              placeholder="Escribe tu comentario..."
              className="comment-textarea"
            />
            <button type="submit" className="comment-submit-button">
              Enviar comentario
            </button>
          </form>
        </div>
      ))}
    </>
  )
}

export default Post