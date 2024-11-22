import axios from 'axios';

export async function getAd(id) {
  try {
    const getAd = await axios.get(`http://127.0.0.1:5137/api/ads/${id}`);

    return getAd.data;
  } catch (error) {
    console.log(error);
  }
}
