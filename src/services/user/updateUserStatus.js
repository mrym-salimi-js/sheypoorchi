import axios from 'axios';

export const updateUserStatus = async (status) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.post(`${baseURL}/api/users/status/${status}`, {
      withCredentials: true,
    });

    return response?.data.status;
  } catch (error) {
    return error?.response?.data.status;
  }
};
