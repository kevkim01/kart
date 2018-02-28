import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

require("react-big-calendar/lib/css/react-big-calendar.css")

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
