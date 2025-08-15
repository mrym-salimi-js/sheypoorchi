// import { lazy } from 'react';

// import PageLoading from '../components/globals/PageLoading';
import { lazy } from 'react';
import { AuthRoute } from './tempAuthRoute';
import { UserAccountRoute } from './UserAccountRoute';
import { SuspenseWrapper } from './tempsSuspenseWrapper';

const Home = lazy(() => import('../pages/Home'));
const NewAd = lazy(() => import('../pages/NewAd'));
const Single = lazy(() => import('../pages/Single'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const Routes = [
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: 's/iran/',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: 's/iran/:category',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: 's/iran/:category',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: 's/iran/:category/:brand',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },
  {
    path: 's/iran/:category/:brand/:model',
    element: (
      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>
    ),
  },

  {
    path: 'newAd',
    element: (
      <SuspenseWrapper>
        <NewAd />
      </SuspenseWrapper>
    ),
  },
  {
    path: 'v/:id/:title',
    element: (
      <SuspenseWrapper>
        <Single />
      </SuspenseWrapper>
    ),
  },
  ...AuthRoute,
  ...UserAccountRoute,

  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
  },
];
