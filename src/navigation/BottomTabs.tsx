import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import CustomBottomTabBarItem from './CustomBottomTabBarItem';
import { useAppColors } from '../assets/appColors.js';
import LeaveRequestScreen from '../screens/LeaveRequestScreen.js';
import shiftScreen from '../screens/shiftScreen.js';
import MenuScreen from '../screens/MenuScreen.js';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const appColors = useAppColors();
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBarItem {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: appColors.white, paddingTop: 16 },
      }}
    >
      <Tab.Screen name="Employees" component={HomeScreen} />
      <Tab.Screen name="Leaves" component={LeaveRequestScreen} />
      <Tab.Screen name="Shifts" component={shiftScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
