import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";
import reportWebVitals from './reportWebVitals';

// Material
import { ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Custom
import './index.scss';
import App from './App';
import CustomTheme from './app/theme/CustomTheme';
import CustomApolloProvider from './app/apollo/apolloClient'
import { AuthProvider } from './app/context/authContext'
import { store } from './app/store/store'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <CustomApolloProvider>
      <ReduxStoreProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={CustomTheme} >
            <BrowserRouter>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </ReduxStoreProvider>
    </CustomApolloProvider>
  </AuthProvider>
  ,
  rootElement
);

reportWebVitals();