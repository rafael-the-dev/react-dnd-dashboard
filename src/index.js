import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.css';
import './assets/css/base.css';
import App from './pages/App';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

