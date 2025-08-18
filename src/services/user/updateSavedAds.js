import axios from 'axios';

export const updateSavedAds = async (adId) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const { data } = await axios.patch(
      `${baseURL}/api/users/saved/${adId}`,
      {}, // body خالی چون فقط مسیر رو میخوایم استفاده کنیم
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    return error;
  }
};
