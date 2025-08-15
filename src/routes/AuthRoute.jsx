import { lazy } from 'react';

import { SuspenseWrapper } from './SuspenseWrapper';
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

export const AuthRoute = [
  {
    path: 'register',
    element: (
      <SuspenseWrapper>
        <Register />
      </SuspenseWrapper>
    ),
  },
  {
    path: 'login',
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: 'forgetPassword',
    element: (
      <SuspenseWrapper>
        <ForgetPassword />
      </SuspenseWrapper>
    ),
  },
  {
    path: 'resetPassword/:token',
    element: (
      <SuspenseWrapper>
        <ResetPassword />
      </SuspenseWrapper>
    ),
  },
];
