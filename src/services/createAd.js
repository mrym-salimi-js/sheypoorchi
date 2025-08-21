import axios from 'axios';

const createAd = async (formData) => {
  // فقط برای دیباگ: محتویات فرم
  console.log([...formData.entries()]);

  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const ad = await axios.post(`${baseURL}/api/ads/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return ad.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default createAd;
