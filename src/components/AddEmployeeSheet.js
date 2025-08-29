import React, { useEffect, useState } from 'react';
import GlobalSheet from './GlobalSheet';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useAppColors } from '../assets/appColors';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import InputField from './InputField';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Label from './Label';
import DatePickerButton from './DatePickerButton';
import showToast from '../utils/toast';
import { launchImageLibrary } from 'react-native-image-picker';

const TAG = 'AddEmployeeSheet.js';
const AddEmployeeSheet = ({
  actionSheetRef,
  itemToEdit,
  addingEmployee,
  onPrimaryButtonPress,
  onClose,
  ...props
}) => {
  const [form, setForm] = useState({
    name: itemToEdit?.name || '',
    email: itemToEdit?.email || '',
    password: itemToEdit?.password || '',
    phone: itemToEdit?.phone || '',
    job_role: itemToEdit?.job_role || '',
    start_date: itemToEdit?.start_date || '',
    image: itemToEdit?.image || '',
  });
  console.log('AddEmployeeSheet : itemToEdit', itemToEdit);
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const [selectedRole] = useMMKVStorage('selectedRole', STORAGE, 'Employee');
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const handleAddEmployee = () => {
    if (validation()) {
      console.log(TAG, 'handleAddEmployee : form', form);
      if (onPrimaryButtonPress) {
        onPrimaryButtonPress({
          requestData: form,
          itemToEdit: itemToEdit,
          onSuccess: () => {
            if (selectedRole === 'Employer') {
              setForm({
                name: '',
                email: '',
                password: '',
                phone: '',
                job_role: '',
                start_date: '',
              });
            }
            actionSheetRef.current?.hide();
          },
        });
      } else {
        console.log(
          TAG,
          'handleAddEmployee : onPrimaryButtonPress is not defined',
        );
      }
    } else {
      console.log(TAG, 'handleAddEmployee : validation failed');
    }
  };
  useEffect(() => {
    if (itemToEdit?.id) {
      setForm({
        name: itemToEdit?.name || '',
        email: itemToEdit?.email || '',
        password: itemToEdit?.password || '',
        phone: itemToEdit?.phone || '',
        job_role: itemToEdit?.job_role || '',
        start_date: itemToEdit?.start_date || '',
        image: itemToEdit?.image || '',
      });
    }
  }, [itemToEdit]);
  const validation = () => {
    if (!form.name) {
      showToast.error('Error', 'Name is required');
      return false;
    }
    if (!form.email) {
      showToast.error('Error', 'Email is required');
      return false;
    }
    if (!form.password && !itemToEdit?.id) {
      showToast.error('Error', 'Password is required');
      return false;
    }
    if (!form.phone) {
      showToast.error('Error', 'Phone is required');
      return false;
    }
    if (!form.job_role) {
      showToast.error('Error', 'Job Role is required');
      return false;
    }
    if (!form.start_date) {
      showToast.error('Error', 'Start Date is required');
      return false;
    }
    return true;
  };

  const handleImageSelection = async () => {
    try {
      const response = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
      });
      console.log('response', response);
      setForm({ ...form, image: response?.assets[0] });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <GlobalSheet
      actionSheetRef={actionSheetRef}
      primaryLoading={addingEmployee}
      onPrimaryButtonPress={handleAddEmployee}
      onOpen={() => {
        const [year, month, day] = itemToEdit?.start_date
          ? itemToEdit?.start_date.split(' ')[0].split('-').map(Number)
          : [
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate(),
            ];
        console.log(
          'AddEmployeeSheet : onOpen : itemToEdit',
          year,
          month,
          day,
          new Date(year, month - 1, day).toDateString(),
        );
        setForm({
          name: itemToEdit?.name || '',
          email: itemToEdit?.email || '',
          password: itemToEdit?.password || '',
          phone: itemToEdit?.phone || '',
          job_role: itemToEdit?.job_role || '',
          start_date: itemToEdit?.start_date ? `${year}-${month}-${day}` : '',
        });
      }}
      onClose={() => {
        setForm({
          name: '',
          email: '',
          password: '',
          phone: '',
          job_role: '',
          start_date: '',
        });
        onClose?.();
      }}
      {...props}
    >
      <KeyboardAvoidingView
        style={{ maxHeight: Dimensions.get('screen').height * 0.7 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // tweak as needed
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ImageWithPlaceholder
            canEdit={selectedRole !== 'Employer'}
            image={form?.image}
            onEditPress={handleImageSelection}
          />
          <Label label="Name" required />
          <InputField
            value={form.name}
            onChangeText={text => setForm({ ...form, name: text })}
            placeholder="Enter Name"
          />
          <Label label="Email" required />
          <InputField
            value={form.email}
            onChangeText={text => setForm({ ...form, email: text })}
            placeholder="Enter Email"
          />
          <Label label="Password" required />
          <InputField
            value={form.password}
            onChangeText={text => setForm({ ...form, password: text })}
            placeholder="Enter Password"
            secureTextEntry
          />
          <Label label="Phone" required />
          <InputField
            value={form.phone}
            onChangeText={text => setForm({ ...form, phone: text })}
            placeholder="Enter Phone"
            keyboardType="phone-pad"
          />
          <Label label="Job Role" required />
          <InputField
            value={form.job_role}
            onChangeText={text => setForm({ ...form, job_role: text })}
            placeholder="Enter Job Role"
          />
          <Label label="Start Date" required />
          <InputField
            value={form.start_date}
            onChangeText={text => setForm({ ...form, start_date: text })}
            placeholder="Select Start Date"
            keyboardType="date-address" // or "numeric"
            disabled={true}
            renderRightElement={
              <DatePickerButton
                value={form.start_date}
                onDateChange={text => setForm({ ...form, start_date: text })}
              />
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </GlobalSheet>
  );
};

export const ImageWithPlaceholder = ({
  image,
  style,
  size = 80,
  containerStyle,
  canEdit = false,
  onEditPress,
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [errorLoading, setErrorLoading] = useState(false);
  return (
    <View style={[styles.AvatarContainer, containerStyle]}>
      {image && !errorLoading ? (
        <Image
          source={{
            uri:
              image?.uri ||
              (image && !image.startsWith('http')
                ? 'https://employee.freelancedemo.site/' + image
                : image),
          }}
          style={[styles.avatar, style]}
          onError={() => setErrorLoading(true)}
        />
      ) : (
        <View style={[styles.avatar, style]}>
          <SvgFromXml xml={svgs.userIcon} height={size} width={size} />
        </View>
      )}
      {canEdit && (
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={onEditPress}
        >
          <SvgFromXml
            xml={svgs.editIcon}
            height={20}
            width={20}
            color={appColors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddEmployeeSheet;

const useStyles = appColors =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      gap: 12,
      paddingBottom: 24,
    },
    AvatarContainer: {
      alignSelf: 'center',
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: appColors.primary,
      borderRadius: 50,
      padding: 5,
    },
  });
