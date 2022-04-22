import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <CustomApolloProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={CustomTheme} >
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </CustomApolloProvider>
  </AuthProvider>
  ,
  rootElement
);

reportWebVitals();