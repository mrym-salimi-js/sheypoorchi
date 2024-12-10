import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { navTo } from '../globals/navTo';
import axios from 'axios';

export function userTokenCheck(baseURL, navigateTo) {
  const userToken = Cookies.get('user-Token');
  const decodedJwt = userToken && jwtDecode(userToken);

  if (!decodedJwt?.id) return;

  const getUser = async () => {
    const userId = decodedJwt.id;

    const user = await axios.get(`${baseURL}/api/users/${userId}`);
    user.status === 200 && navTo('/myAccount', '', navigateTo);
  };
  getUser();
}
