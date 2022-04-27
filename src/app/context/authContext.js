import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../reducers/userSlice'

const initialState = {
  user: null,
}

if (localStorage.getItem('token')) {
  const decodedToken = jwtDecode(localStorage.getItem('token'))
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
  } else {
    initialState.user = decodedToken
  }
}

const authContext = createContext({
  user: null,
  login: (userData) => { },
  logout: () => { },
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    localStorage.setItem('token', userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT'
    })
  }

  return (
    <authContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export {
  authContext, AuthProvider
}