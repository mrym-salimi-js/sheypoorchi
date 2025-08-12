import axios from 'axios';

const createAd = async (formData) => {
  console.log([...formData.entries()]);
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const ad = await axios.post(`${baseURL}/api/ads/`, formData);
    return ad.data;
  } catch (error) {
    console.log(error);
  }
};
export default createAd;
