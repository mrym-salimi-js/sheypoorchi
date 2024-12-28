import axios from 'axios';

export const getAdsByCategory = async (category, queryParams) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(
      `${baseURL}/api/ads/s/${category}?${queryParams}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
