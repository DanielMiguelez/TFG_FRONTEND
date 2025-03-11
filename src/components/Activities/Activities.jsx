import React, { useEffect } from 'react'
import Activity from './Activity/Activity'
import { useDispatch } from 'react-redux'
import { getAllActivities } from '../../features/activities/activitiesSlice'

const Activities = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllActivities())
  }, [])
  


  return (
    <div><Activity/></div>
  )
}

export default Activities