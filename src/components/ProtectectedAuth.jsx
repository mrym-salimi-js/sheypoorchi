import axios from 'axios';
import { navTo } from '../utils/globals/navTo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectectedAuth({ path, children }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigateTo = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get(`${baseURL}/api/users/checkAuth`, {
          withCredentials: true,
        });
        path === 'dashboard'
          ? navTo(`/${path}`, '', navigateTo)
          : navTo(`/dashboard/${path}`, '', navigateTo);
      } catch (error) {
        error && navTo('/login', '', navigateTo);
      }
    };
    getUser();
  }, []);

  return children;
}
