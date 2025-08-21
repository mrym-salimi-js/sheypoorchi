import axios from 'axios';

const createAd = async (formData) => {
  console.log([...formData.entries()]);

  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const ad = await axios.post(`${baseURL}/api/ads/`, formData); // بدون Content-Type دستی
    return ad.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default createAd;
