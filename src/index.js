import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// Material
import { ThemeProvider } from '@mui/material/styles';

// Custom
import './index.scss';
import App from './App';
import CustomTheme from './app/theme/CustomTheme';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: process.env.REACT_APP_NODESERVER_BASEURL,
  cache: new InMemoryCache()
});



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={CustomTheme} >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();