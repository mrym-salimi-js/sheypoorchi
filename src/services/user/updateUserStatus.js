import axios from 'axios';

export const updateUserStatus = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.get(`${baseURL}/api/users/status`, {
      withCredentials: true,
    });
    // console.log(response);
    return response?.data.status;
  } catch (error) {
    return error?.response?.data.status;
  }
};
