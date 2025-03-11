import React from 'react'
import { useSelector } from 'react-redux'
import './Activity.css'

const Activity = () => {

  const { activities } = useSelector(state => state.activities)
  return (
    <>


      <div className='parentActivities'>
        
      <h2>Activities</h2>
        {activities.map (activity => {
          return (
            <>
            <div className='activityBox'>
                <span> Titulo : {activity.title}</span>
                <span>Fecha : {activity.date}</span>
                <span>Descripción : {activity.description}</span>
                <span>Creado por : {activity.userId}</span>
              </div>
            </>
          )
        })}
      </div>

    </>
  )
}

export default Activity