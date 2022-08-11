import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { library } from "@fortawesome/fontawesome-svg-core";
import { StrictMode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus, faCirclePlay, faCirclePause, faRotate } from "@fortawesome/free-solid-svg-icons";

library.add(faSquarePlus, faSquareMinus, faCirclePlay, faCirclePause, faRotate )

ReactDOM.render(<App />, document.getElementById('root'));




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
