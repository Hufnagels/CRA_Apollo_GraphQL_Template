import React, { useState, useEffect, memo, useContext } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'

// Material

// Custom
import routes from './app/routes/routes'
import { authContext } from './app/context/authContext'

const App = () => {
  //const { isLoggedIn } =  useSelector((state) => state.user);
  //const isLoggedIn = true

  const { user } = useContext(authContext)
  const navigate = useNavigate()
  const isLoggedIn = user === null ? false : true

  let page = useRoutes(routes(isLoggedIn));
  const [loading, setLoading] = React.useState(true)
  console.log('App user', user);


  useEffect(() => {
    console.log("App.js->useEffect");
  }, []);

  return (
    <React.Fragment>
      {page}
    </React.Fragment>
  );
}

export default memo(App)