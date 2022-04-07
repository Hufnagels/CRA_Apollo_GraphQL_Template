import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"

// Material
import { ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Custom
import './index.scss';
import App from './App';
import CustomTheme from './app/theme/CustomTheme';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_NODESERVER_BASEURL
})

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) 
    graphQLErrors.forEach(({message, locations, path}) => console.log(
    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ),
  )
  if (networkError) console.log('NetworkError', networkError)
})

const tokenLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : 'No valid token found'
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  //uri: process.env.REACT_APP_NODESERVER_BASEURL,
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  connectToDevTools: true
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={CustomTheme} >
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();