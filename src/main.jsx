import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CookiesProvider } from 'react-cookie';
// import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>
  // </React.StrictMode>
);
