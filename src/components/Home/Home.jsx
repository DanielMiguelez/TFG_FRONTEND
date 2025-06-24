import Carousel from "../Carousel/Carousel";
import { useState, useEffect } from "react";
import postsService from "../../features/posts/postsService";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getAllActivities } from "../../features/activities/activitiesSlice";
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activities = useSelector((state) => state.activities.activities);
  const [api, contextHolder] = notification.useNotification();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null
  });

  const [activityData, setActivityData] = useState({
    title: "",
    description: "",
    status: "open",
    date: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const showSuccessNotification = (message, description) => {
    api.success({
      message,
      description,
      icon: (
        <CheckCircleFilled 
          style={{ 
            color: '#008000 !important',
            fontSize: '24px',
          }}
          className="success-icon"
        />
      ),
      placement: 'topRight',
      duration: 3,
      className: 'custom-success-notification',
      style: {
        borderRadius: '8px',
      },
    });
  };

  const showErrorNotification = (message, description) => {
    api.error({
      message,
      description,
      icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '24px' }} />,
      placement: 'topRight',
      duration: 3,
      style: {
        borderRadius: '8px',
      },
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      if (postData.image) {
        formData.append("image", postData.image);
      }

      await postsService.createPost(formData);
      showSuccessNotification(
        'Post Creado',
        'El post se ha creado correctamente'
      );
      setPostData({ title: "", content: "", image: null });
      
      // Redirigir a la página de posts después de 1.5 segundos
      setTimeout(() => {
        navigate("/posts");
      }, 1500);
    } catch (error) {
      console.error("Error al crear post:", error);
      showErrorNotification(
        'Error al Crear Post',
        error?.message || 'Ha ocurrido un error al crear el post'
      );
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("title", activityData.title);
      formData.append("description", activityData.description);
      formData.append("status", activityData.status);
      formData.append("date", activityData.date);
      formData.append("location", activityData.location);
      if (activityData.image) {
        formData.append("image", activityData.image);
      }
  
      await dispatch(createActivity(formData)).unwrap();
      showSuccessNotification(
        'Actividad Creada',
        'La actividad se ha creado correctamente'
      );
      dispatch(getAllActivities());
  
      setActivityData({
        title: "",
        description: "",
        status: "open",
        date: "",
        location: "",
        image: null,
      });
    } catch (error) {
      console.error("Error al crear actividad:", error);
      showErrorNotification(
        'Error al Crear Actividad',
        error?.message || 'Ha ocurrido un error al crear la actividad'
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div className="home-container">
        <div className="content-wrapper">
          <Carousel />

          <div className="forms-container">
            {/* Formulario para crear post */}
            <div className="form-section">
              <h2>Crear nuevo post</h2>
              <form onSubmit={handlePostSubmit} className="create-form">
                <div className="form-group">
                  <label htmlFor="post-title">Título</label>
                  <input
                    type="text"
                    id="post-title"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-content">Contenido</label>
                  <textarea
                    id="post-content"
                    value={postData.content}
                    onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-image">Imagen</label>
                  <input
                    type="file"
                    id="post-image"
                    accept="image/*"
                    onChange={(e) => setPostData({ ...postData, image: e.target.files[0] })}
                  />
                </div>

                <button type="submit" className="submit-button">Crear Post</button>
              </form>
            </div>

            <div className="form-section">
              <h2>Crear nueva actividad</h2>
              <form onSubmit={handleActivitySubmit} className="create-form">
                <div className="form-group">
                  <label htmlFor="activity-title">Título</label>
                  <input
                    type="text"
                    id="activity-title"
                    value={activityData.title}
                    onChange={(e) =>
                      setActivityData({ ...activityData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-description">Descripción</label>
                  <textarea
                    id="activity-description"
                    value={activityData.description}
                    onChange={(e) =>
                      setActivityData({
                        ...activityData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-status">Estado</label>
                  <select
                    id="activity-status"
                    value={activityData.status}
                    onChange={(e) =>
                      setActivityData({ ...activityData, status: e.target.value })
                    }
                  >
                    <option value="open">Abierta</option>
                    <option value="in-progress">En progreso</option>
                    <option value="closed">Cerrada</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="activity-date">Fecha</label>
                  <input
                    type="date"
                    id="activity-date"
                    value={activityData.date}
                    onChange={(e) =>
                      setActivityData({ ...activityData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-location">Ubicación</label>
                  <input
                    type="text"
                    id="activity-location"
                    value={activityData.location}
                    onChange={(e) =>
                      setActivityData({ ...activityData, location: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-image">Imagen</label>
                  <input
                    type="file"
                    id="activity-image"
                    accept="image/*"
                    onChange={(e) =>
                      setActivityData({ ...activityData, image: e.target.files[0] })
                    }
                  />
                </div>

                <button type="submit" className="submit-button">
                  Crear Actividad
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
