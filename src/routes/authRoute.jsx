import { lazy } from 'react';

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

export const authRoute = [
  { path: 'register', element: <Register /> },
  { path: 'login', element: <Login /> },
  { path: 'forgetPassword', element: <ForgetPassword /> },
  { path: 'resetPassword/:token', element: <ResetPassword /> },
];
