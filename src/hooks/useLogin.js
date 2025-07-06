import { useState } from 'react';
import { showToast } from '../utils/toast';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import { apiClient } from '../services/common/apiClient';
import { useNavigation } from '@react-navigation/native';

export const useLogin = ({ selectedRole }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useMMKVStorage('auth', STORAGE, {});
  const [user, setUser] = useMMKVStorage('user', STORAGE, {});

  const handleLoginSuccess = response => {
    console.log(`[useLogin] [handleLogin] success`);
    showToast.success('Login Successful', 'Welcome back!');
    setAuth(response);
    setUser(response.data);
    navigation.replace('BottomTabs');
  };

  const checkValidation = () => {
    if (!email || !password) {
      showToast.warning(
        'Missing Information',
        'Please enter both email and password.',
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (!checkValidation()) {
        return;
      }
      setIsLoading(true);
      const response = await apiClient.post(
        selectedRole == 'Employee' ? '/login_employee' : '/login',
        { email, password },
      );
      console.log('response', response);
      handleLoginSuccess(response);
    } catch (e) {
      showToast.error(
        'Login Failed',
        e?.response?.data?.message ||
          e?.message ||
          'Please check your credentials and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { email, setEmail, password, setPassword, isLoading, handleLogin };
};
