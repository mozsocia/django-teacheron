import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import './utils/toastrOption'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>

);
