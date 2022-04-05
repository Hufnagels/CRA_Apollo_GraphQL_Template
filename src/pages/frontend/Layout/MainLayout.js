import React from 'react'
import { SnackbarProvider } from 'notistack';

import Header from './Header'
import Main from './Main'
import StickyFooter from './Footer'

const MainLayout = () => {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5}>
        <Header />
        <Main />
        <StickyFooter />
      </SnackbarProvider>
    </React.Fragment>
  )
}

export default MainLayout