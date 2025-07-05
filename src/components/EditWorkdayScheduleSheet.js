import React from 'react';
import GlobalSheet from './GlobalSheet';
import { SingleEmployeeItem } from './EmployeeList';
import DropDownPicker from './DropDownPicker';
export const item = {
  id: 1,
  heading: 'Jennie Nolan',
  label: 'jennie.nolan@example.com',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
};
const shifts = [
  {
    label: 'Morning Shift',
    value: '1',
    subLabel: '07:00 AM - 03:00 PM',
  },
  {
    label: 'Afternoon Shift',
    value: '2',
    subLabel: '03:00 PM - 11:00 PM',
  },
  {
    label: 'Evening Shift',
    value: '3',
    subLabel: '11:00 PM - 07:00 AM',
  },
];
const EditWorkdayScheduleSheet = ({ actionSheetRef, itemToEdit, ...props }) => {
  return (
    <GlobalSheet actionSheetRef={actionSheetRef} {...props}>
      <SingleEmployeeItem hideEditIcon item={itemToEdit} />
      <DropDownPicker data={shifts} label={'Select Shift'} />
    </GlobalSheet>
  );
};

export default EditWorkdayScheduleSheet;
