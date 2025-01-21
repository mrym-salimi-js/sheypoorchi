import axios from 'axios';

export const updateUserPass = async (formData) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const res = await axios.patch(
      `${baseURL}/api/users/updateMyPassword`,
      formData,
      {
        withCredentials: true,
      }
    );
    return res.response.data;
  } catch (error) {
    return error.response.data;
  }
};
