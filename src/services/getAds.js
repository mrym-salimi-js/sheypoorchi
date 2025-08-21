import axios from 'axios';

export const getAds = async (searchParams) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    const allAds = await axios.get(
      `${baseURL}/api/ads${
        searchParams !== undefined ? `?${searchParams}` : `/`
      }`
    );
    return allAds;
  } catch (error) {
    console.log(error);
  }
};
