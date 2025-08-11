import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  const [user, setUser] = useMMKVStorage('user', STORAGE, {});
  const [selectedRole, setSelectedRole] = useMMKVStorage(
    'selectedRole',
    STORAGE,
    'Employee',
  );
  console.log('user', user);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.View}>
        <Stack.Navigator
          initialRouteName={user?.id ? 'BottomTabs' : 'Login'}
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: appColors.white },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="EmployeeCalander" component={EmployeeCalander} />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}

const useStyles = appColors => {
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
