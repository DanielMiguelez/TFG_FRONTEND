import Carousel from "../Carousel/Carousel";
import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null
  });

  const [activityData, setActivityData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: null
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar el post al backend
    console.log("Post data:", postData);
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar la actividad al backend
    console.log("Activity data:", activityData);
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <Carousel/>
        
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
                  onChange={(e) => setPostData({...postData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="post-content">Contenido</label>
                <textarea
                  id="post-content"
                  value={postData.content}
                  onChange={(e) => setPostData({...postData, content: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="post-image">Imagen</label>
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  onChange={(e) => setPostData({...postData, image: e.target.files[0]})}
                />
              </div>
              
              <button type="submit" className="submit-button">Crear Post</button>
            </form>
          </div>

          {/* Formulario para crear actividad */}
          <div className="form-section">
            <h2>Crear nueva actividad</h2>
            <form onSubmit={handleActivitySubmit} className="create-form">
              <div className="form-group">
                <label htmlFor="activity-title">Título</label>
                <input
                  type="text"
                  id="activity-title"
                  value={activityData.title}
                  onChange={(e) => setActivityData({...activityData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activity-description">Descripción</label>
                <textarea
                  id="activity-description"
                  value={activityData.description}
                  onChange={(e) => setActivityData({...activityData, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activity-date">Fecha</label>
                <input
                  type="datetime-local"
                  id="activity-date"
                  value={activityData.date}
                  onChange={(e) => setActivityData({...activityData, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activity-location">Ubicación</label>
                <input
                  type="text"
                  id="activity-location"
                  value={activityData.location}
                  onChange={(e) => setActivityData({...activityData, location: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="activity-image">Imagen</label>
                <input
                  type="file"
                  id="activity-image"
                  accept="image/*"
                  onChange={(e) => setActivityData({...activityData, image: e.target.files[0]})}
                />
              </div>
              
              <button type="submit" className="submit-button">Crear Actividad</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
