import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render( <
    BrowserRouter >
    <
    Routes >
    <
    Route exact path = "/"
    element = { < Login / > }
    /> <
    Route exact path = "/home"
    element = { < Home / > }
    /> <
    / Routes> <
    / BrowserRouter>,
    document.getElementById('root')
);