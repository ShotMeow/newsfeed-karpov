import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';
import { initI18n } from '@features/locale/utils';
import { createRoot } from 'react-dom/client';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js?')
      .then(function () {
        // eslint-disable-next-line no-console
        console.log('Service Worker Registered!!');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('cant register SW', error);
      });
  });
}

const root = createRoot(document.getElementById('root') as HTMLElement);

initI18n(() => {
  root.render(
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <Router>
          <App />
        </Router>
      </NetworkStatusContextProvider>
    </Provider>
  );
});
