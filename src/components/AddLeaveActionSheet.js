import React, { useState } from 'react';
import GlobalSheet from './GlobalSheet';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
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
import DropDownPicker from './DropDownPicker';
import { pick } from '@react-native-documents/picker';

const TAG = 'AddLeaveActionSheet.js';
const AddLeaveActionSheet = ({
  actionSheetRef,
  itemToEdit,
  addingEmployee,
  onAddLeavePress,
  primaryLoading,
  ...props
}) => {
  const [form, setForm] = useState({
    type: itemToEdit?.type || 'sick',
    start_date: itemToEdit?.start_date || '',
    end_date: itemToEdit?.end_date || '',
    note: itemToEdit?.note || '',
  });
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const handleAddLeave = () => {
    if (validation()) {
      console.log(TAG, 'handleAddLeave : form', form);
      if (onAddLeavePress) {
        onAddLeavePress({
          requestData: form,
          itemToEdit: itemToEdit,
          onSuccess: () => {
            setForm({
              type: 'sick',
              start_date: '',
              end_date: '',
              note: '',
            });
            actionSheetRef.current?.hide();
          },
        });
      } else {
        console.log(
          TAG,
          'handleAddLeave : onPrimaryButtonPress is not defined',
        );
      }
    } else {
      console.log(TAG, 'handleAddLeave : validation failed');
    }
  };
  const validation = () => {
    if (!form.type) {
      showToast.error('Error', 'Type is required');
      return false;
    }
    if (!form.start_date) {
      showToast.error('Error', 'Start Date is required');
      return false;
    }
    if (!form.end_date) {
      showToast.error('Error', 'End Date is required');
      return false;
    }
    return true;
  };
  const handleDocumentSelection = async () => {
    try {
      const response = await pick();
      setForm({ ...form, document: response[0] });
    } catch (error) {
      console.log('handleDocumentSelection : error', error);
    }
  };
  return (
    <GlobalSheet
      actionSheetRef={actionSheetRef}
      primaryLoading={primaryLoading}
      onPrimaryButtonPress={handleAddLeave}
      title={itemToEdit?.id ? 'Update Leave Request' : 'Add Leave Request'}
      primaryButtonText={itemToEdit?.id ? 'Update' : 'Add'}
      secondaryButtonText={'Cancel'}
      onOpen={() => {
        const [year, month, day] = itemToEdit?.start_date
          ? itemToEdit?.start_date.split(' ')[0].split('-').map(Number)
          : ['', '', ''];

        console.log(
          'AddLeaveActionSheet : onOpen : itemToEdit',
          year,
          month,
          day,
          new Date(year, month - 1, day).toDateString(),
        );
        setForm({
          type: itemToEdit?.type || '',
          start_date: itemToEdit?.start_date ? `${year}-${month}-${day}` : '',
          end_date: itemToEdit?.end_date ? `${year}-${month}-${day}` : '',
          note: itemToEdit?.note || '',
        });
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
          <DropDownPicker
            data={[
              { label: 'Sick', value: 'sick' },
              { label: 'Free Day', value: 'free_day' },
            ]}
            setValue={text => setForm({ ...form, type: text })}
            value={form?.type}
            label="Type"
          />
          <Label label="Start Date" required />
          <InputField
            value={form.start_date}
            onChangeText={text => setForm({ ...form, start_date: text })}
            placeholder="Select Start Date"
            keyboardType="date-address"
            disabled={true}
            renderRightElement={
              <DatePickerButton
                value={form.start_date}
                onDateChange={text => setForm({ ...form, start_date: text })}
              />
            }
          />
          <Label label="End Date" required />
          <InputField
            value={form.end_date}
            onChangeText={text => setForm({ ...form, end_date: text })}
            placeholder="Select End Date"
            keyboardType="date-address"
            disabled={true}
            secureTextEntry={false}
            renderRightElement={
              <DatePickerButton
                value={form.end_date}
                onDateChange={text => setForm({ ...form, end_date: text })}
              />
            }
          />
          <Label label="Notes" required />
          <InputField
            value={form.note}
            onChangeText={text => setForm({ ...form, note: text })}
            placeholder="Enter Notes"
            textArea={true}
          />
          <Label label="Document" />
          <InputField
            value={form?.document?.name || form?.document || ''}
            placeholder="Select Document"
            iconLeftXml={svgs.fileIconXml}
            onPress={handleDocumentSelection}
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
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={[styles.AvatarContainer, containerStyle]}>
      {image ? (
        <Image source={{ uri: image }} style={[styles.avatar, style]} />
      ) : (
        <View style={[styles.avatar, style]}>
          <SvgFromXml xml={svgs.userIcon} height={size} width={size} />
        </View>
      )}
    </View>
  );
};

export default AddLeaveActionSheet;

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
      borderWidth: 1,
      borderColor: appColors.accent,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
