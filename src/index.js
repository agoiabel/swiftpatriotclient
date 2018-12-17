import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './shared/root.store';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
	<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root')
);

serviceWorker.unregister();
