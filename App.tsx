import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from './src/storage/STORAGE';
import { Appearance, StatusBar, useColorScheme } from 'react-native';
import { appColors } from './src/assets/appColors';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useMMKVStorage(
    'isDarkMode',
    STORAGE,
    false,
  );
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    // listen to color scheme change
    const subscription = Appearance.addChangeListener(
      ({ colorScheme }: { colorScheme: string | null | undefined }) => {
        if (colorScheme) {
          setIsDarkMode(colorScheme === 'dark');
        }
      },
    );
    return () => subscription.remove();
  }, [colorScheme, setIsDarkMode]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? appColors.background : '#fff',
      }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
      <Toast />
    </SafeAreaView>
  );
}
