import axios from 'axios';

export const getChatContacts = async () => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.get(`${baseURL}/api/chat/chatContacts`, {
      withCredentials: true,
    });
    if (response.data.status === 'fail') {
      throw new Error('درخواست با خطا مواجه شد');
    }

    return response.data;
  } catch (error) {
    return error;
  }
};
