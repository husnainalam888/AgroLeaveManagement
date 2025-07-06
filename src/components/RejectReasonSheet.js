import React, { useState } from 'react';
import GlobalSheet from './GlobalSheet';
import { KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import InputField from './InputField';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Label from './Label';
const TAG = 'AddEmployeeSheet.js';
const AddEmployeeSheet = ({ actionSheetRef, onRejectPress, ...props }) => {
  const [reason, setReason] = useState('');
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const handleRejectPress = () => {
    if (reason) {
      console.log(TAG, 'handleRejectPress : reason', reason);
      if (onRejectPress) {
        onRejectPress({
          reason,
          onSuccess: () => {
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

  return (
    <GlobalSheet
      actionSheetRef={actionSheetRef}
      primaryLoading={false}
      onPrimaryButtonPress={handleRejectPress}
      onOpen={() => setReason('')}
      primaryButtonText="Reject"
      secondaryButtonText="Cancel"
      title={'Reject Leave Request'}
      onSecondaryButtonPress={() => actionSheetRef.current?.hide()}
      {...props}
    >
      <KeyboardAvoidingView
        style={{ maxHeight: Dimensions.get('screen').height * 0.7, gap: 12 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // tweak as needed
      >
        <Label label="Reason" required />
        <InputField
          value={reason}
          onChangeText={text => setReason(text)}
          placeholder="Enter Reason for Rejection"
        />
      </KeyboardAvoidingView>
    </GlobalSheet>
  );
};

export default AddEmployeeSheet;
