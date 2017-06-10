import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/MineSweeper.js';
import './index.css';

ReactDOM.render(<App row = {6} col = {6} mine = {2}  failMsg = "Try Again"/>, document.getElementById('root'));

