import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../../app/context/authContext'

const Logout = () => {

  const navigate = useNavigate()

  const { logout } = useContext(authContext)

  const onLogout = () => {
    logout()
    navigate('/')
  }
  React.useEffect(() => {
    onLogout()
  }, [])
  return null
}

export default Logout