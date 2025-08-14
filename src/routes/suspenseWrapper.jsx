import { Suspense } from 'react';
import PageLoading from '../components/globals/PageLoading';

export function SuspenseWrapper({ children }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}
