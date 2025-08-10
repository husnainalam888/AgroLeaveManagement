import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from './src/storage/STORAGE';

export default function App() {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}
    >
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
      <Toast />
    </SafeAreaView>
  );
}
