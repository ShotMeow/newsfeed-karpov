import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { initializeAPI } from '@app/api';
import { store } from '@app/store';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { createRoot } from 'react-dom/client';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';

const firebaseApp = initializeAPI();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service Worker Registered!!');
      })
      .catch((e) => console.error('cant register SW', e));
  });
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <NetworkStatusContextProvider>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </NetworkStatusContextProvider>
  </Provider>
);
