import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@app/common.css';
import { App } from '@app/components/App/App';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';
import { initI18n } from '@features/locale/utils';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';

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

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://9aeadf12f36d4637a029c039db8767ef@o4504661115928576.ingest.sentry.io/4504661118025728',
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
