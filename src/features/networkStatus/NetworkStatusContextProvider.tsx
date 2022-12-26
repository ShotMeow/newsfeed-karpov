import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { TNetworkStatus } from '@features/networkStatus/types';

export const networkStatus = createContext<TNetworkStatus>({
  online: true,
});

export const useNetworkStatusContext = (): TNetworkStatus => {
  return useContext<TNetworkStatus>(networkStatus);
};

export const NetworkStatusContextProvider: FC<PropsWithChildren> = (props) => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  return (
    <networkStatus.Provider
      value={{
        online: isOnline,
      }}
    >
      {props.children}
    </networkStatus.Provider>
  );
};
