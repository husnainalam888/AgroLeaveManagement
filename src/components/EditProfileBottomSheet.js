import React, { useState } from 'react';
import GlobalSheet from './GlobalSheet';
import { Image, StyleSheet, View } from 'react-native';
import { useAppColors } from '../assets/appColors';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import InputField from './InputField';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Label from './Label';
import { ImageWithPlaceholder } from './AddEmployeeSheet';

const EditWorkdayScheduleSheet = ({ actionSheetRef, itemToEdit, ...props }) => {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [user] = useMMKVStorage('user', STORAGE, {});
  const [form, setForm] = useState({
    image: null,
    name: user?.name,
    email: user?.email,
    password: user?.password,
    phone: user?.phone,
  });
  return (
    <GlobalSheet actionSheetRef={actionSheetRef} {...props}>
      <View style={styles.AvatarContainer}>
        <ImageWithPlaceholder
          image={itemToEdit?.image}
          style={styles.avatar}
          size={70}
          onPress={() => {}}
        />
        <View style={styles.editIcon}>
          <SvgFromXml
            xml={!isDarkMode ? svgs.editIconLight : svgs.editIcon}
            height={20}
            width={20}
          />
        </View>
      </View>
      <Label label={'Name'} />
      <InputField value={form?.name} placeholder={'Enter Name'} />
      <Label label={'Email'} />
      <InputField value={form?.email} placeholder={'Enter Email'} />
      <Label label={'Password'} />
      <InputField value={form?.password} placeholder={'Enter Password'} />
      <Label label={'Phone'} />
      <InputField value={form?.phone} placeholder={'Enter Phone'} />
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
