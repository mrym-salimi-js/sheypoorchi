import axios from 'axios';

export const getUser = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/api/users/me`, {
      withCredentials: true,
    });
    if (response?.data?.status === 'fail')
      throw new Error('درخواست با خطا مواجه شد');
    return response?.data?.data;
  } catch (error) {
    return error.response?.data?.status;
  }
};
