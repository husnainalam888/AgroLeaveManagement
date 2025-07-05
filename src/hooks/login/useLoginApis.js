import { post } from '../../services/common/apiService';

const useLoginApis = () => {
  const login = async ({ email, password }) => {
    try {
      const response = await post('/login', { email, password });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { login };
};

export default useLoginApis;
