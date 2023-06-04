import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App';
import styles from './scss/application.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

render(
    <App />,
    document.getElementById('root')
);

// import React from "react"
// import ReactDOM from "react-dom"
// import { BrowserRouter as Router } from "react-router-dom"

// import App from './components/App'

// ReactDOM.render(
//     <Router>
//         <App />
//     </Router>,
//     document.getElementById('root')
// )
