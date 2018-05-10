import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import { Model } from 'vue-api-query'

// inject global axios instance as http client to Model
Model.$http = axios

ReactDOM.render(
		<App />, document.getElementById('root'));
registerServiceWorker();
