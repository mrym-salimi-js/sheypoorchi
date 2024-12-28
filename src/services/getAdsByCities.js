import axios from 'axios';

export const getAdsByCities = async (cookieCitiesInUrl) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const res = axios.get(`${baseURL}/api/ads?cities=${cookieCitiesInUrl}`);
    return res;
  } catch (error) {
    return error;
  }
};
