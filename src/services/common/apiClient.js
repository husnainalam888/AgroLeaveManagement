import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { STORAGE } from '../../storage/STORAGE';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000,
});

apiClient.interceptors.request.use(cfg => {
  const auth = STORAGE.getMap('auth');
  cfg.headers.Authorization = `Bearer ${auth?.access_token}`;
  return cfg;
});

apiClient.interceptors.response.use(
  res => {
    return res?.data;
  },
  err => Promise.reject(err),
);
