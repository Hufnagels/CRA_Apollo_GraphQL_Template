import React, { useState, useEffect, memo, useContext } from 'react';
import { useRoutes, } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'

// Material

// Custom
import routes from './app/routes/routes'
import { authContext } from './app/context/authContext'

const App = () => {
  //const { isLoggedIn } =  useSelector((state) => state.user);
  //const isLoggedIn = true

  const { user } = useContext(authContext)
  const isLoggedIn = user === null ? false : true

  const page = useRoutes(routes(isLoggedIn));

  console.log('App user', user);
  useEffect(() => {
    //console.log("App.js->useEffect");
  }, []);

  return (
    <React.Fragment>
      {page}
    </React.Fragment>
  );
}

export default memo(App)