import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import svgs from '../assets/svgs';
import DepartWiseEmployeeList from '../components/DepartWiseEmployeeList.js';
import Fab from '../components/Fab.js';
import { useAppColors } from '../assets/appColors';
import { useHomeScreen } from '../hooks/useHomeScreen';
import AddEmployeeSheet from '../components/AddEmployeeSheet';

export const departWiseEmployeeList = [
  {
    id: 1,
    heading: 'Product',
    subList: [
      {
        id: 1,
        heading: 'Jennie Nolan',
        label: 'jennie.nolan@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
      },
      {
        id: 2,
        heading: 'Will Smith',
        label: 'will.smith@example.com',
        image:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        heading: 'Emma Watson',
        label: 'emma.watson@example.com',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    id: 2,
    heading: 'Marketing',
    subList: [
      {
        id: 7,
        heading: 'Nova Peris',
        label: 'nova.peris@example.com',
        image:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },

      {
        id: 4,
        heading: 'James Doe',
        label: 'james.doe@example.com',
        image:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 6,
        heading: 'Tom Hardy',
        label: 'tom.hardy@example.com',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];
const HomeScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const actionSheetRef = useRef(null);
  const {
    menuOptions,
    employeeList,
    handleAddEmployee,
    addingEmployee,
    loadingEmployeeList,
    handleEditEmployee,
    employeeToEdit,
    setEmployeeToEdit,
  } = useHomeScreen({ actionSheetRef });

  return (
    <View style={styles.container}>
      <Header
        startIcon={svgs.logoIcon}
        threeDotOptions={menuOptions}
        label="Employees"
      />
      <DepartWiseEmployeeList
        data={employeeList}
        loading={loadingEmployeeList}
        onEdit={handleEditEmployee}
      />
      <Fab onPress={() => actionSheetRef.current?.show()} />
      <AddEmployeeSheet
        title={employeeToEdit?.id ? 'Edit Employee' : 'Add Employee'}
        actionSheetRef={actionSheetRef}
        primaryButtonText={employeeToEdit?.id ? 'Update' : 'Add'}
        onPrimaryButtonPress={handleAddEmployee}
        secondaryButtonText="Cancel"
        addingEmployee={addingEmployee}
        itemToEdit={employeeToEdit}
        onClose={() => setEmployeeToEdit(null)}
      />
    </View>
  );
};

export default HomeScreen;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });
};
