import axios from 'axios';

export const getUserById = async (userId) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(`${baseURL}/api/users/user/${userId}`, {
      withCredentials: true,
    });

    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    return error.response.data.status;
  }
};
