import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ExplainBindingsComponent from './ExplainBindingsComponent';


ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
    }
registerServiceWorker();
