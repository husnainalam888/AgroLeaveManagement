import { STORAGE } from '../storage/STORAGE';

const saveToken = token => {
  STORAGE.setString('token', token);
};

const getToken = () => {
  return STORAGE.getString('token');
};

export { saveToken, getToken };
