import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/styles/fonts.css';
import './assets/styles/global.css';

import { initializeAPI } from './api';

import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App/App';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

const firebaseApp = initializeAPI();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
