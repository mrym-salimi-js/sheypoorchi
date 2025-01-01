import axios from 'axios';

export const updateUserInfo = async (formData) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const res = await axios.patch(`${baseURL}/api/users/updateMe`, formData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};
