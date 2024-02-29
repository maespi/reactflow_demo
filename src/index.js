import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Flow from "./views/pages/Flow";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
        <Routes>
            <Route exact path="/" element={<App />}/>
            <Route path="/Flow" Component={Flow} />

            {/* If any route mismatches the upper
              route endpoints then, redirect triggers
              and redirects app to home component with to="/" */}
            {/* <Redirect to="/" /> */}
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    </Router>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
