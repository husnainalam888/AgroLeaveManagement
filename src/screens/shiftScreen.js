import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import DepartWiseEmployeeList from '../components/DepartWiseEmployeeList';
import { departWiseEmployeeList } from './HomeScreen';
import { context } from '../constants/constants';
import DatePickerButton from '../components/DatePickerButton';
import EditWorkdayScheduleSheet from '../components/EditWorkdayScheduleSheet.js';
const ShiftScreen = () => {
  const [itemToEdit, setItemToEdit] = useState(null);
  const actionSheetRef = useRef(null);
  const openShiftActionSheet = item => {
    setItemToEdit(item);
    actionSheetRef.current?.show();
  };
  return (
    <View style={styles.container}>
      <Header label="Shifts" footer={DatePickerButton} />
      <DepartWiseEmployeeList
        data={departWiseEmployeeList}
        context={context.shift}
        onEdit={openShiftActionSheet}
      />
      <EditWorkdayScheduleSheet
        actionSheetRef={actionSheetRef}
        title={'Edit Workday Schedule'}
        primaryButtonText={'Save'}
        itemToEdit={itemToEdit}
        secondaryButtonText={'Cancel'}
      />
    </View>
  );
};

export default ShiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
