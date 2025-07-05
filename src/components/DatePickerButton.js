import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useAppColors } from '../assets/appColors';
import DatePicker from '@react-native-community/datetimepicker';

const DatePickerButton = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const formattedDate = date?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const handleDatePicker = () => setIsDatePickerVisible(true);
  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate);
    setIsDatePickerVisible(false);
  };
  return (
    <>
      {Platform.OS == 'android' && (
        <TouchableOpacity style={styles.container} onPress={handleDatePicker}>
          {<Text style={styles.text}>{date ? formattedDate : 'Today'}</Text>}
        </TouchableOpacity>
      )}
      <DatePicker
        mode="date"
        value={date}
        onChange={handleDateChange}
        style={styles.datePicker}
        // display="calendar"
        textColor={appColors.black}
        accentColor={appColors.primary}
        themeVariant="dark"
        locale="en_US"
      />
    </>
  );
};

export default DatePickerButton;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: appColors.lightGray,
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      color: appColors.black,
    },
    datePicker: {},
  });
};
