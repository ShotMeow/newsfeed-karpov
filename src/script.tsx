import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/styles/fonts.css';
import './assets/styles/global.css';

import { initializeAPI } from './api';

import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';

initializeAPI();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
