import axios from 'axios';

// export const updateUserStatus = async (status, useBeacon = false) => {
//   const baseURL = import.meta.env.VITE_BASE_URL;
//   const url = `${baseURL}/api/users/status/${status}`;
//   const data = JSON.stringify({ status });

//   try {
//     if (useBeacon && navigator.sendBeacon) {
//       // ارسال سریع و مطمئن هنگام بستن پنجره
//       navigator.sendBeacon(url, data);
//       return status;
//     }

//     const response = await axios.patch(
//       url,
//       { status },
//       {
//         withCredentials: true,
//       }
//     );

//     return response?.data.status;
//   } catch (error) {
//     return error?.response?.data?.status;
//   }
// };
export const updateUserStatus = async (status) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.patch(
      `${baseURL}/api/users/status/${status}`,
      { status }, // این میشه body
      {
        withCredentials: true, // این میشه config
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response?.data.status;
  } catch (error) {
    return error?.response?.data.status;
  }
};
