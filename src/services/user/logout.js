import axios from 'axios';
import { navTo } from '../../utils/globals/navTo';

export const logout = async (navigateTo) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/api/users/logout`, {
      withCredentials: true,
    });

    response.data.status === 'success' && navTo('/', '', navigateTo);
  } catch (error) {
    return error;
  }
};
