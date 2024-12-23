import axios from 'axios';

export const updateSavedAds = async (adId) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const savedAd = await axios.get(`${baseURL}/api/users/saved/${adId}`, {
      withCredentials: true,
    });
    return savedAd;
  } catch (error) {
    return error;
  }
};
