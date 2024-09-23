import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';
import { ToastContainer } from 'react-toastify';
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
        {/* <ToastContainer></ToastContainer> */}
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
