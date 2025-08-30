import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppColors } from '../assets/appColors';
import LeaveRequests from '../components/LeaveRequests';
import {
  LeaveRequestsProvider,
  useLeaveRequests,
} from '../hooks/useLeaveRequests';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Fab from '../components/Fab';
import AddLeaveActionSheet from '../components/AddLeaveActionSheet';

const Tab = createMaterialTopTabNavigator();
const TAB_NAMES = ['Pending', 'Approved', 'Rejected'];

const CustomTabBar = ({ state, navigation }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBackground}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTab]}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isFocused && styles.activeText]}>
                {route.name}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

function LeaveTabsComponent() {
  const [selectedRole, setSelectedRole] = useMMKVStorage(
    'selectedRole',
    STORAGE,
    'Employee',
  );
  const appColors = useAppColors();
  const screenOptions = {
    headerShown: false,
    sceneStyle: { backgroundColor: appColors.cardBackground },
    tabBarPosition: 'top',
  };
  const addLeaveActionSheetRef = useRef(null);
  const { getLeaveRequests, leaveRequests, handleAddLeave, addingLeave } =
    useLeaveRequests();

  useEffect(() => {
    getLeaveRequests();
    console.log(
      'LeaveTabsComponent : useEffect : getLeaveRequests',
      leaveRequests,
    );
  }, []);

  const handleFabPress = () => {
    addLeaveActionSheetRef.current?.show();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBar={props => <CustomTabBar {...props} />}
      >
        {TAB_NAMES.map(name => (
          <Tab.Screen
            key={name}
            name={name}
            component={LeaveRequests}
            initialParams={{ status: name }}
          />
        ))}
      </Tab.Navigator>
      {selectedRole == 'Employee' && <Fab onPress={handleFabPress} />}
      <AddLeaveActionSheet
        actionSheetRef={addLeaveActionSheetRef}
        onAddLeavePress={handleAddLeave}
      />
    </>
  );
}

export default function LeaveTabs() {
  return (
    <LeaveRequestsProvider>
      <LeaveTabsComponent />
    </LeaveRequestsProvider>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    tabContainer: {
      marginBottom: 20,
      marginHorizontal: 20,
    },
    tabBackground: {
      flexDirection: 'row',
      backgroundColor: appColors.searchBackground,
      borderRadius: 16,
      padding: 6,
      borderWidth: 2,
      borderColor: '#ffffff20',
      ...(appColors.black == '#000' && {
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }),
    },
    tabItem: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    activeTab: {
      backgroundColor: appColors.cardBackground,
      elevation: 3,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: appColors.gray,
      textAlign: 'center',
    },
    activeText: {
      color: appColors.primary,
      fontWeight: '700',
    },
    activeIndicator: {
      position: 'absolute',
      bottom: 4,
      width: 20,
      height: 3,
      backgroundColor: appColors.primary,
      borderRadius: 2,
    },
  });
};
