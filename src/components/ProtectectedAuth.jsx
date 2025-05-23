import axios from 'axios';
import { navTo } from '../utils/globals/navTo';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectectedAuth({ path }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigateTo = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get(`${baseURL}/api/users/me`, {
          withCredentials: true,
        });
        path === 'dashboard' && navTo(`/${path}`, '', navigateTo);
      } catch (error) {
        error && navTo('/login', '', navigateTo);
      }
    };
    getUser();
  }, []);

  return <Outlet />;
}
