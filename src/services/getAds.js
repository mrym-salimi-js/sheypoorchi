import axios from 'axios';

export const getAds = async () => {
  try {
    const allAds = await axios.get('http://127.0.0.1:5137/api/ads/');
    return allAds.data;
  } catch (error) {
    console.log(error);
  }
};
