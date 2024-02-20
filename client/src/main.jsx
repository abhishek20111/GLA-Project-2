import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'flowbite';
import store from './store/store.js'; // Import the store using default import
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Helmet>
        <title>LearnUp</title>
        <meta name="description" content="LearnUp is platform for Education, Courses, Intership, Contest" />
      </Helmet>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
