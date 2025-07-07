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
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import AntDesign from 'react-native-vector-icons/AntDesign';
const DatePickerButton = ({ value, onDateChange }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const valueToDate = value ? new Date(value) : new Date();
  console.log('DatePickerButton : valueToDate', value);
  const [date, setDate] = useState(valueToDate);
  const formattedDate = date?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const dashFormattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const handleDatePicker = () => setIsDatePickerVisible(true);
  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate);
    setIsDatePickerVisible(false);
    onDateChange(
      `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`,
    );
  };
  return (
    <>
      {Platform.OS == 'android' && (
        <TouchableOpacity style={styles.container} onPress={handleDatePicker}>
          {/* {<Text style={styles.text}>{date ? formattedDate : 'Today'}</Text>} */}
          <AntDesign name="calendar" size={24} color={appColors.lightGray} />
        </TouchableOpacity>
      )}
      {Platform.OS == 'ios' ||
        (isDatePickerVisible && (
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
        ))}
    </>
  );
};

export default DatePickerButton;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      color: appColors.black,
    },
    datePicker: {},
  });
};
