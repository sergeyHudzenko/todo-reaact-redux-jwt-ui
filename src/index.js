import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Styles
import "../src/assets/index.css";
import App from "./App";
//Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { ApolloLink } from "apollo-link";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import hasJWT from './utils/checkJwt';
import RouteGuard from "./components/RouteGuard";
import Token from "./utils/token";

const container = document.getElementById('root');
const root = createRoot(container);

const mainResourse = new HttpLink({
  uri: 'http://localhost:4000',
  headers: {
    Authorization: hasJWT() ? `Bearer ${Token.getToken()}` : ''
  }
});

const authResourse = new HttpLink({
  uri: 'http://localhost:4000/auth'
});

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "auth",
    authResourse,
    mainResourse
  ),
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route 
              path="/" 
              element={
                <RouteGuard
                  jwtRequired={true}
                  navigateTo='/sign-in'
                >
                  <App />
                </RouteGuard>
              }
            />
            <Route 
              path="/sign-in" 
              element={
                <RouteGuard
                  jwtRequired={false}
                  navigateTo='/'
                >
                  <App signInMode={true} />
                </RouteGuard>
              }
            />
            <Route 
              path="/sign-up" 
              element={
                <RouteGuard
                  jwtRequired={false}
                  navigateTo='/'
                >
                  <App signUpMode={true} />
                </RouteGuard>
              }
            />
          </Routes>
        </Provider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
