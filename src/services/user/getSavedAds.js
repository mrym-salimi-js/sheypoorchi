import axios from 'axios';

export const getSavedAds = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/api/users/savedAds`, {
      withCredentials: true,
    });
    if (response.data.status === 'fail')
      throw new Error('درخواست با خطا مواجه شد');
    return response.data.data;
  } catch (error) {
    return error;
  }
};
