import React from 'react'
import { SnackbarProvider } from 'notistack';

//import Header from './Header'
import HeaderResponsiveAppBar from '../../../components/Layout/AppBar'
import Main from './Main'

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
  { name: 'Dashboard', link: '/app/user/profile' },
  { name: 'Logout', link: '/app/user/profile' }
];

const AdminLayout = () => {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5}>
        <HeaderResponsiveAppBar title="GraphQL Demo" pages={pages} settings={settings} />
        <Main />
      </SnackbarProvider>
    </React.Fragment>
  )
}

export default AdminLayout