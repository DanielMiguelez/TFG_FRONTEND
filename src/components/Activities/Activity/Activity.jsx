import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, joinActicity, leaveActivity } from '../../../features/activities/activitiesSlice';
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import './Activity.css';

const Activity = () => {

  const { activities } = useSelector(state => state.activities)
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);


  const handleJoin = async (id) => {
    try {
      await dispatch(joinActicity(id));
      dispatch(getAllActivities());
      api.success({
        message: 'Éxito',
        description: 'Te has unido a la actividad correctamente',
        icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
      });
    } catch (error) {
      api.error({
        message: 'Error',
        description: 'No se pudo unir a la actividad',
        icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      });
    }
  };

  const handleLeave = async (id) => {
    try {
      await dispatch(leaveActivity(id));
      dispatch(getAllActivities());
      api.success({
        message: 'Éxito',
        description: 'Has abandonado la actividad correctamente',
        icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
      });
    } catch (error) {
      api.error({
        message: 'Error',
        description: 'No se pudo abandonar la actividad',
        icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />
      });
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activities-empty">
        {contextHolder}
        No hay actividades disponibles en este momento.
      </div>
    )
  }

  return (
    <div className='parentActivities'>
      {contextHolder}
      <h2>Actividades</h2>
      <div className="activities-grid">
        {activities.map((activity, index) => {

          return (
            <div className='activityBox' key={activity._id || index}>
              <span className="activity-title">{activity.title}</span>
              {activity.image && (
                <img
                  src={`https://tfg-backend-xgxu.vercel.app${activity.image}`}
                  alt={activity.title}
                  className="activity-image"
                />
              )}
              <span className="activity-date">{new Date(activity.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
              <span className="activity-description">{activity.description}</span>
              <span className="activity-user">
                Creado por: {activity.userId?.name || 'Desconocido'}
              </span>

              <div className="activity-actions">
                <button onClick={() => handleJoin(activity._id)} >
                  Unirse
                </button>
                <button onClick={() => handleLeave(activity._id)}>
                  Salir
                </button>
              </div>

              <div className="activity-participants">
                Participantes: {activity.participantIds.length}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity