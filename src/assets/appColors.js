import { useColorScheme } from 'react-native';
import { STORAGE } from '../storage/STORAGE';
import { useMMKVStorage } from 'react-native-mmkv-storage';

const dark = {
  borderColor: '#5C5C5C',
  white: '#000',
  black: '#fff',
  gray: '#D1D1D1',
  darkGray: '#777',
  lightGray: '#f5f5f5',
  primary: '#efcb00',
  accent: '#ffffff26',
  secondary: '#2D2D2D',
  unFocus: `#D4D4D4`,
  overlayColor: '#9a9a9a',
};

const light = {
  borderColor: '#CCCCCC',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  darkGray: '#272727',
  lightGray: '#484848',
  primary: '#efcb00',
  secondary: '#EEEEEE',
  unFocus: '#AAAAAA',
  overlayColor: '#000000',
  accent: '#0000001a',
};
export const useAppColors = () => {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  return isDarkMode ? dark : light;
};
export const appColors = STORAGE?.getBool?.('isDarkMode') ? dark : light;
export default useAppColors;
