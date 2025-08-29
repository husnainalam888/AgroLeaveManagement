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
  // New colors for RoleSelectionScreen
  background: '#1A1A1A',
  cardBackground: '#2D2D2D',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  borderLight: '#404040',
  shadowColor: '#000000',
  employeeIconBg: '#1E3A5F',
  employerIconBg: '#1E3A1E',
  disabledBg: '#404040',
  disabledText: '#606060',
  dividerColor: '#404040',
  // New colors for LoginScreen
  welcomeTextColor: '#FFFFFF',
  subtitleColor: '#B0B0B0',
  roleBadgeBg: '#1E3A5F',
  roleIndicatorBorder: '#404040',
  formTitleColor: '#FFFFFF',
  formSubtitleColor: '#B0B0B0',
  roleIndicatorTextColor: '#FFFFFF',
  roleSubtextColor: '#B0B0B0',
  forgotPasswordColor: '#efcb00',
  // New colors for HomeScreen and LeaveRequestScreen
  searchBackground: '#1A1A1A',
  actionButtonBg: '#404040',
  statusActive: '#4CAF50',
  statusInactive: '#FF6B6B',
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
  // New colors for RoleSelectionScreen
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  textPrimary: '#1A202C',
  textSecondary: '#718096',
  textTertiary: '#4A5568',
  borderLight: '#E2E8F0',
  shadowColor: '#000000',
  employeeIconBg: '#EBF8FF',
  employerIconBg: '#F0FFF4',
  disabledBg: '#CBD5E0',
  disabledText: '#A0AEC0',
  dividerColor: '#E2E8F0',
  // New colors for LoginScreen
  welcomeTextColor: '#2D3748',
  subtitleColor: '#718096',
  roleBadgeBg: '#FFF8E1',
  roleIndicatorBorder: '#E2E8F0',
  formTitleColor: '#1A202C',
  formSubtitleColor: '#718096',
  roleIndicatorTextColor: '#2D3748',
  roleSubtextColor: '#718096',
  forgotPasswordColor: '#efcb00',
  // New colors for HomeScreen and LeaveRequestScreen
  searchBackground: '#F8F9FA',
  actionButtonBg: '#F0F0F0',
  statusActive: '#4CAF50',
  statusInactive: '#FF6B6B',
};
export const useAppColors = () => {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  return isDarkMode ? dark : light;
};
export const appColors = STORAGE?.getBool?.('isDarkMode') ? dark : light;
export default useAppColors;
