import React from 'react'
import { SnackbarProvider } from 'notistack';

//import Header from './Header'
import HeaderResponsiveAppBar from '../../../components/Layout/AppBar'
import Main from './Main'

const AdminLayout = () => {
  const pages = [
    { name: 'Users', link: '/app/users' },
    { name: 'Courses', link: '/app/courses' },
    { name: 'Maps', link: '/app/maps' },
    { name: 'MindMaps', link: '/app/mindmaps' },
    { name: 'Blogs', link: '/app/blogs' },
    { name: 'Home', link: '/' },
  ];
  const settings = [
    { name: 'Profile', link: '/app/user/profile' },
    { name: 'Account', link: '/app/user/profile' },
  ];

  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5}>
        <HeaderResponsiveAppBar title={process.env.REACT_APP_WEBSITE_NAME} pages={pages} settings={settings} />
        <Main />
      </SnackbarProvider>
    </React.Fragment>
  )
}

export default AdminLayout