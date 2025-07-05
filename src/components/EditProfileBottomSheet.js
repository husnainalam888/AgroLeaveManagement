import React from 'react';
import GlobalSheet from './GlobalSheet';
import { Image, StyleSheet, View } from 'react-native';
import { useAppColors } from '../assets/appColors';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import InputField from './InputField';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Label from './Label';

const EditWorkdayScheduleSheet = ({ actionSheetRef, itemToEdit, ...props }) => {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <GlobalSheet actionSheetRef={actionSheetRef} {...props}>
      <View style={styles.AvatarContainer}>
        <Image source={{ uri: itemToEdit?.image }} style={styles.avatar} />
        <View style={styles.editIcon}>
          <SvgFromXml
            xml={!isDarkMode ? svgs.editIconLight : svgs.editIcon}
            height={20}
            width={20}
          />
        </View>
      </View>
      <Label label={'Name'} />
      <InputField value={itemToEdit?.name} placeholder={'Enter Name'} />
      <Label label={'Email'} />
      <InputField value={itemToEdit?.email} placeholder={'Enter Email'} />
    </GlobalSheet>
  );
};

export default EditWorkdayScheduleSheet;

const useStyles = appColors =>
  StyleSheet.create({
    AvatarContainer: {
      alignSelf: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    editIcon: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: appColors.primary,
      borderRadius: 50,
      padding: 5,
    },
  });
