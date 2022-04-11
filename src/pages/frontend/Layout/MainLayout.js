import React from 'react'
import { SnackbarProvider } from 'notistack';

import HeaderResponsiveAppBar from '../../../components/Layout/AppBar'
import Main from './Main'
import StickyFooter from '../../../components/Layout/Footer'

const pages = [
  {name: 'Home', link: '/'}, 
  {name: 'Blog', link: '/blog'},
  {name: 'Dashboard', link: '/app/'},
];
const settings = null;

const MainLayout = () => {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5}>
        <HeaderResponsiveAppBar title="GraphQL Demo" pages={pages} settings={settings} />
        <Main />
        <StickyFooter />
      </SnackbarProvider>
    </React.Fragment>
  )
}

export default MainLayout