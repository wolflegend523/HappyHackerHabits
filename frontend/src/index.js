import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import './styles/index.css';
import './styles/themes.css';
import App from './App';

/* starting point for the application */
// the app is rendered in the root of the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// the app is render in strict mode to catch common mistakes
// the app is wrapped in a provider to allow access to the redux store
// and the browser router to allow for routing everywhere in the app
root.render(
  <React.StrictMode> 
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
