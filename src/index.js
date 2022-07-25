import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
<<<<<<< HEAD

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
=======
=======
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439
import {
  BrowserRouter as Router,
  
  Route,
  Link,
  NavLink,
  Routes,
  BrowserRouter
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
<<<<<<< HEAD
>>>>>>> 957485058d54838f4634c7483606cdb38d5ce888
=======
>>>>>>> c579309dc3a531e9830199a3656d7373a75cb439
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
