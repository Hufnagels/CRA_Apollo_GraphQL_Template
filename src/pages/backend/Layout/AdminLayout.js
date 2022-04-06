import React from 'react'
import { SnackbarProvider } from 'notistack';

import Header from './Header'
import Main from './Main'

const AdminLayout = () => {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5}>
        <Header />
        <Main />
      </SnackbarProvider>
    </React.Fragment>
  )
}

export default AdminLayout