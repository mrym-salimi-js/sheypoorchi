import axios from 'axios';
import { navTo } from '../functions/globals/navTo';
import { useNavigate } from 'react-router-dom';

export default function ProtectectedAuth({ children }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigateTo = useNavigate();
  const getUser = async () => {
    try {
      await axios.get(`${baseURL}/api/users/checkAuth`, {
        withCredentials: true,
      });
    } catch (error) {
      error && navTo('/login', '', navigateTo);
    }
  };
  getUser();

  return children;
}
