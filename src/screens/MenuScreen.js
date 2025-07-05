import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import { useAppColors } from '../assets/appColors';
import { SingleEmployeeItem } from '../components/EmployeeList';
import { item } from '../components/EditWorkdayScheduleSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import EditProfileBottomSheet from '../components/EditProfileBottomSheet';
import { useNavigation } from '@react-navigation/native';
const MenuScreen = () => {
  const navigation = useNavigation();
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const actionSheetRef = useRef(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const handleEditProfile = item => {
    console.log('item', item);
    setItemToEdit(item);
    actionSheetRef.current?.show();
  };
  return (
    <View style={styles.container}>
      <Header label="Menu" />
      <View style={styles.profileContainer}>
        <SingleEmployeeItem item={item} onEdit={handleEditProfile} />
      </View>
      <MenuRow
        icon={<Feather name="moon" size={18} color={appColors.lightGray} />}
        label="Dark Mode"
        isSwitch
        onPress={() => {}}
      />
      <MenuRow
        icon={
          <AntDesign name="calendar" size={16} color={appColors.lightGray} />
        }
        label="Employee Calendar"
        onPress={() => {
          navigation.navigate('EmployeeCalander');
        }}
      />
      <MenuRow
        icon={<Feather name="clock" size={16} color={appColors.lightGray} />}
        label="Manage Workday Schedules"
      />

      <MenuRow
        icon={<AntDesign name="logout" size={16} color={appColors.lightGray} />}
        label="Logout"
        onPress={() => {}}
      />
      <EditProfileBottomSheet
        actionSheetRef={actionSheetRef}
        itemToEdit={itemToEdit}
        title="Edit Profile"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onPrimaryButtonPress={() => {}}
        onSecondaryButtonPress={() => {}}
      />
    </View>
  );
};

const MenuRow = ({ label, onPress, icon, isSwitch }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [isSwitchOn, setIsSwitchOn] = useMMKVStorage(
    'isDarkMode',
    STORAGE,
    false,
  );
  const handleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    onPress();
  };
  return (
    <TouchableOpacity
      style={styles.menuRow}
      activeOpacity={0.8}
      onPress={isSwitch ? handleSwitch : onPress}
    >
      <View style={styles.menuRowIcon}>{icon}</View>
      <Text style={styles.menuRowText}>{label}</Text>
      {!isSwitch ? (
        <AntDesign name="right" size={16} color={appColors.lightGray} />
      ) : (
        <Switch
          value={isSwitchOn}
          onValueChange={handleSwitch}
          trackColor={{ false: appColors.lightGray, true: appColors.primary }}
          style={styles.menuRowSwitch}
        />
      )}
    </TouchableOpacity>
  );
};

export default MenuScreen;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.white,
      paddingHorizontal: 16,
      gap: 16,
    },
    profileContainer: {
      marginTop: 6,
      padding: 16,
      backgroundColor: appColors.accent,
      borderRadius: 10,
    },
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      minHeight: 50,
      backgroundColor: appColors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: appColors.borderColor,
      gap: 10,
    },
    menuRowText: {
      fontSize: 14,
      fontWeight: '500',
      color: appColors.black,
      flex: 1,
    },
    menuRowSwitch: {
      transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
      marginRight: -10,
    },
  });
};
