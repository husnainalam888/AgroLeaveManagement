import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabs from './BottomTabs.tsx';
import { StyleSheet, View } from 'react-native';
import { useAppColors } from '../assets/appColors.js';
import EmployeeCalander from '../screens/EmployeeCalander';
import { STORAGE } from '../storage/STORAGE.js';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [user] = useMMKVStorage('user', STORAGE, {});
  const [onboardingCompleted] = useMMKVStorage(
    'onboardingCompleted',
    STORAGE,
    false,
  );
  const [selectedRole] = useMMKVStorage('selectedRole', STORAGE, null);

  // Determine initial route based on user state
  const getInitialRouteName = () => {
    if (user && typeof user === 'object' && 'id' in user && user.id) {
      return 'BottomTabs';
    }
    if (!onboardingCompleted) {
      return 'Onboarding';
    }
    if (!selectedRole) {
      return 'RoleSelection';
    }
    return 'Login';
  };

  console.log('user', user);
  console.log('onboardingCompleted', onboardingCompleted);
  console.log('selectedRole', selectedRole);

  return (
    <View style={styles.View}>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: appColors.white },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="EmployeeCalander" component={EmployeeCalander} />
      </Stack.Navigator>
    </View>
  );
}
const useStyles = (appColors: any) => {
  return StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: appColors.white,
    },
    View: {
      flex: 1,
      backgroundColor: appColors.white,
    },
  });
};
