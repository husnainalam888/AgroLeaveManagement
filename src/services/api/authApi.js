import { get, post } from '../common/apiService';
import ENDPOINTS from './endpoints';

export const authApi = {
  login: credentials => post(ENDPOINTS.AUTH.LOGIN, credentials),

  logout: () => post(ENDPOINTS.AUTH.LOGOUT),

  refreshToken: () => post(ENDPOINTS.AUTH.REFRESH),

  getProfile: () => get(ENDPOINTS.AUTH.PROFILE),
};
