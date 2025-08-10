import { useEffect, useState } from 'react';
import { apiClient } from '../services/common/apiClient';
import showToast from '../utils/toast';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';

export const useHomeScreen = ({ actionSheetRef }) => {
  const [employeeList, setEmployeeList] = useMMKVStorage(
    'employeeList',
    STORAGE,
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [addingEmployee, setAddingEmployee] = useState(false);
  const [loadingEmployeeList, setLoadingEmployeeList] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  useEffect(() => {
    setEmployeeList([]);
    getEmployeeList();
  }, []);
  const getEmployeeList = async () => {
    try {
      setLoadingEmployeeList(true);
      const response = await apiClient.get('/employer/get');
      console.log('useHomeScreen : getEmployeeList : response', response);
      if (response.status) {
        setEmployeeList(
          response.data?.map(employee => ({
            id: employee.role,
            heading:
              employee?.role?.charAt?.(0)?.toUpperCase?.() +
                employee?.role?.slice?.(1) || 'Employee',
            subList: employee.employees.map(emp => ({
              id: emp.id,
              heading: emp.name,
              label: emp.email,
              image: emp.profile_photo_url,
              ...emp,
            })),
            ...employee,
          })),
        );
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('error', error);
      showToast.error('Error', error?.message || 'Something went wrong');
    } finally {
      setLoadingEmployeeList(false);
    }
  };

  const menuOptions = [
    {
      label: 'Sort by heading',
      onSelect: () => console.log('Sort by heading'),
    },
    { label: 'Sort by ID', onSelect: () => console.log('Sort by ID') },
    {
      label: 'Sort by Department',
      onSelect: () => console.log('Sort by Department'),
    },
    {
      label: 'Sort by Designation',
      onSelect: () => console.log('Sort by Designation'),
    },
    { label: 'Sort by Status', onSelect: () => console.log('Sort by Status') },
  ];

  const mapEmployeeList = employeeList.map(employee => ({
    id: employee.id,
    heading: employee.first_name + ' ' + employee.last_name,
    label: employee.email,
    image: employee.profile_photo_url,
    ...employee,
  }));

  const handleAddEmployee = async ({ requestData, itemToEdit, onSuccess }) => {
    try {
      setAddingEmployee(true);
      console.log(
        'useHomeScreen : handleAddEmployee : requestData',
        requestData,
      );

      const response = await (itemToEdit?.id
        ? apiClient.put(`employer/edit/${itemToEdit?.id}`, requestData)
        : apiClient.post('/employer/create', requestData));
      console.log('useHomeScreen : handleAddEmployee : response', response);
      if (response.status) {
        showToast.success(
          'Success',
          response?.message || 'Employee added successfully',
        );
        getEmployeeList();
        setTimeout(() => {
          actionSheetRef.current?.hide();
        }, 1000);
        if (onSuccess) onSuccess();
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('useHomeScreen : handleAddEmployee : error', error);
      showToast.error(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    } finally {
      setAddingEmployee(false);
    }
  };

  const handleEditEmployee = employee => {
    setEmployeeToEdit(employee);
    actionSheetRef.current?.show();
  };

  return {
    menuOptions,
    employeeList: mapEmployeeList,
    getEmployeeList,
    handleAddEmployee,
    addingEmployee,
    loadingEmployeeList,
    employeeToEdit,
    setEmployeeToEdit,
    handleEditEmployee,
  };
};
