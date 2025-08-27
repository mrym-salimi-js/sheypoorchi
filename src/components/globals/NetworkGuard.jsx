import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { Navigate, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
// import NetError from './NetError';
import Offline from '../../pages/Offline';

export function NetworkGuard({ children }) {
  const isOnline = useNetworkStatus();
  const location = useLocation();
  console.log(isOnline);
  useEffect(() => {
    if (!isOnline) {
      return <Offline />;
    }
  }, [isOnline]);

  if (!isOnline) {
    return <Navigate to='/offline' replace />;
  }

  return children;
}
