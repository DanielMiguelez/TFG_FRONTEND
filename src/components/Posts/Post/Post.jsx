import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Post.css'
import { getAllPosts, like, unlike, insertComment } from '../../../features/posts/postsSlice'
import { Link } from "react-router-dom";
import { HeartOutlined, DislikeOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const Post = () => {
  const { posts } = useSelector(state => state.posts)
  const [comments, setComments] = useState({});
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const showSuccessNotification = () => {
    api.success({
      message: 'Comentario añadido',
      description: 'Tu comentario se ha añadido correctamente',
    });
  };

  const showErrorNotification = (error) => {
    api.error({
      message: 'Error',
      description: error || 'No se pudo añadir el comentario',
    });
  };

  const onLike = async (id) => {
    await dispatch(like(id))
    dispatch(getAllPosts())
  }

  const onUnlike = async (id) => {
    await dispatch(unlike(id))
    dispatch(getAllPosts())
  }

  const handleSubmitComment = async (postId, e) => {
    e.preventDefault();
    const commentContent = comments[postId]?.trim();
    
    if (!commentContent) {
      showErrorNotification('El comentario no puede estar vacío');
      return;
    }

    try {
      await dispatch(insertComment({
        postId,
        comment: commentContent  // Cambiado para coincidir con el backend
      })).unwrap();
      
      // Limpiar solo el comentario del post específico
      setComments(prev => ({
        ...prev,
        [postId]: ''
      }));
      
      showSuccessNotification();
      dispatch(getAllPosts());
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'No se pudo añadir el comentario';
      showErrorNotification(errorMessage);
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
                src={`http://localhost:8000/uploads/${post.image}`}
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