import axios from 'axios';

const getChatMessages = async (adIdInParams) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const response = await axios.get(
      `${baseURL}/api/chat/chatMessages/${adIdInParams}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
export default getChatMessages;
