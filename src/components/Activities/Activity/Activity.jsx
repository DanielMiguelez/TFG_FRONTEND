import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, joinActicity, leaveActivity } from '../../../features/activities/activitiesSlice';

import './Activity.css';

const Activity = () => {
  const { activities } = useSelector(state => state.activities)
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handleJoin = async (id) => {
    await dispatch(joinActicity(id));
    dispatch(getAllActivities());
  };

  const handleLeave = async (id) => {
    await dispatch(leaveActivity(id));
    dispatch(getAllActivities());
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activities-empty">
        No hay actividades disponibles en este momento.
      </div>
    )
  }

  return (
    <div className='parentActivities'>
      <h2>Actividades</h2>
      <div className="activities-grid">
        {activities.map((activity, index) => {

          return (
            <div className='activityBox' key={activity._id || index}>
              <span className="activity-title">{activity.title}</span>
              <span className="activity-date">{new Date(activity.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
              <span className="activity-description">{activity.description}</span>
              <span className="activity-user">Creado por: {activity.userId}</span>

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