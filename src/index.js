import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.css';
import './assets/css/base.css';
import App from './pages/App';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

