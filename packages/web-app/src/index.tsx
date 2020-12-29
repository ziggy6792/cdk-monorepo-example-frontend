import React from 'react';
import ReactDOM from 'react-dom';
import Logger from 'js-logger';
import App from './app';
import reportWebVitals from './reportWebVitals';
import './index.css';

Logger.setLevel(Logger.INFO);
// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
