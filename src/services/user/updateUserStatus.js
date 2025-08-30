import axios from 'axios';

export const updateUserStatus = async (status, useBeacon = false) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const url = `${baseURL}/api/users/status/${status}`;

  try {
    // Send befor closong window
    if (useBeacon) {
      fetch(url, {
        method: 'PATCH',
        keepalive: true,
        credentials: 'include',
      });
    }

    // For usuall
    const response = await axios.patch(
      url,
      { status },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response?.data.status;
  } catch (error) {
    return error?.response?.data?.status;
  }
};
