import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Styles
import "../src/assets/index.css";
import App from "./App";
//Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const container = document.getElementById('root');
const root = createRoot(container);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sign-up" element={<App signUpMode={true} />} />
            <Route path="/sign-in" element={<App signInMode={true} />} />
          </Routes>
        </Provider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
