import axios from 'axios';

export const getAds = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const allAds = await axios.get(`${baseURL}/api/ads/`);
    return allAds.data;
  } catch (error) {
    console.log(error);
  }
};
