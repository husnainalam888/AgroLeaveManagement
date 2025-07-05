import axios from 'axios';

const BASE_URL = 'https://employee.freelancedemo.site/api';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

client.interceptors.response.use(
  res => res,
  error => {
    const status = error.response?.status;
    if (status === 401) {
      console.log('Unauthorized - redirect to login');
    }
    return Promise.reject(error);
  },
);

export const setAuthToken = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const get = async (endpoint, params = {}) => {
  const response = await client.get(endpoint, { params });
  return response.data;
};

export const post = async (endpoint, data = {}) => {
  const response = await client.post(endpoint, data);
  return response.data;
};

export const put = async (endpoint, data = {}) => {
  const response = await client.put(endpoint, data);
  return response.data;
};

export const del = async endpoint => {
  const response = await client.delete(endpoint);
  return response.data;
};

export const patch = async (endpoint, data = {}) => {
  const response = await client.patch(endpoint, data);
  return response.data;
};
