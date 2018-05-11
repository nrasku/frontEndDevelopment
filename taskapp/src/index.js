import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import { Model } from 'vue-api-query'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// inject global axios instance as http client to Model
Model.$http = axios

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider >, document.getElementById('root'));
registerServiceWorker();
