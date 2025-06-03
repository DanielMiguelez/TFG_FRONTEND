import React from 'react'
import { useSelector } from 'react-redux'
import './Profile.css'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  // Si no hay usuario o está cargando
  if (!user || !user.user) {
    return (
      <div className="loading-state">
        Cargando información...
      </div>
    )
  }

  const { name, email, _id } = user.user

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mi Perfil</h1>
      </div>
      
      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">Nombre:</span>
          <span className="info-value">{name || 'No disponible'}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{email || 'No disponible'}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">ID:</span>
          <span className="info-value">{_id || 'No disponible'}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile