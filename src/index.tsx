import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { initializeAPI } from '@app/api';
import { store } from '@app/store';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { createRoot } from 'react-dom/client';

const firebaseApp = initializeAPI();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </Provider>
);
