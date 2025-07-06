import Toast from 'react-native-toast-message';

export const showToast = {
  success: (title, message = '') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  error: (title, message = '') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 4000,
    });
  },

  warning: (title, message = '') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3500,
    });
  },

  info: (title, message = '') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  // Custom toast with more options
  custom: config => {
    Toast.show({
      position: 'top',
      visibilityTime: 3000,
      ...config,
    });
  },
};

export default showToast;
