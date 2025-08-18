import axios from 'axios';
import { navTo } from '../../utils/globals/navTo';
import { clearUserQueries } from '../../utils/user/clearUserQueries';

export const logout = async (navigateTo) => {
  const baseURL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.get(`${baseURL}/api/users/logout`, {
      withCredentials: true,
    });
    console.dir(response.data);

    if (response.data.status === 'success') {
      // کش‌های مربوط به کاربر رو پاک کن
      clearUserQueries();

      // انتقال به صفحه اصلی
      navTo('/', '', navigateTo);
    }
  } catch (error) {
    return error;
  }
};
