import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {user} = useSelector((state) => state.auth)

  if(!user){
    return <span>Cargando información</span>
  }

  return (
     <div>
      <h1>Profile</h1>
      <p>{user.user?.name}</p>
      <p>{user.user?.email}</p>
      <p>{user?.user?.id}</p>
    </div>
  )
}

export default Profile