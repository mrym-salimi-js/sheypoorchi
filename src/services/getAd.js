import axios from 'axios';

export async function getAd(id) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const getAd = await axios.get(`${baseURL}/api/ads/${id}`);

    return getAd.data;
  } catch (error) {
    console.log(error);
  }
}
