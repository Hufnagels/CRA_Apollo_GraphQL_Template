import React, { useState, useEffect, memo} from 'react';
import { 
  useRoutes,
 } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
// Material

// Custom
import routes from './app/routes/routes'

// Material

// Custom
import ResponsiveAppBar from './Layout/AppBar';
import UsersListIndex from './components/Users/UsersListIndex';

const App = () => {
  //const { isLoggedIn } =  useSelector((state) => state.user);
  const isLoggedIn = true
  let page = useRoutes(routes(isLoggedIn));
  const [loading, setLoading] = React.useState(true)
console.log('App');

  useEffect(() => {
    console.log("App.js->useEffect");
  }, []);
 
  return (
    <React.Fragment>
      {/* <ResponsiveAppBar /> 
      {loading && <UsersListIndex />} */}
      {page}
    </React.Fragment>
  );
/**/
}

export default memo(App)