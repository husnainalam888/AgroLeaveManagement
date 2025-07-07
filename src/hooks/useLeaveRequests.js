// LeaveRequestsContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import { apiClient } from '../services/common/apiClient';
import showToast from '../utils/toast';
const TAG = 'LeaveRequestsContext';
const LeaveRequestsContext = createContext({
  leaveRequests: [],
  getLeaveRequests: () => Promise.resolve(),
  isLoading: false,
});

export const LeaveRequestsProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useMMKVStorage(
    'leaveRequests',
    STORAGE,
    [],
  );
  const [selectedRole, setSelectedRole] = useMMKVStorage(
    'selectedRole',
    STORAGE,
    'Employee',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [addingLeave, setAddingLeave] = useState(false);
  const [user] = useMMKVStorage('user', STORAGE, {});
  const getLeaveRequests = async () => {
    if (selectedRole == 'Employee') {
      const freeDayLeaves = await getEmployeeLeaves('free_day');
      const sickLeaves = await getEmployeeLeaves('sick');
      setLeaveRequests([...sickLeaves, ...freeDayLeaves]);
    } else {
      getEmployerLeaves();
    }
  };
  const getEmployerLeaves = async () => {
    console.log('getLeaveRequests : getLeaveRequests');
    try {
      setIsLoading(true);
      const response = await apiClient.get('employer/getall/leaves');
      console.log('getLeaveRequests : response', response);
      setIsLoading(false);

      if (response.status) {
        setLeaveRequests(response.data);
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('getLeaveRequests:', error);
      showToast.error(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
  };
  const getEmployeeLeaves = async status => {
    console.log('getLeaveRequests : getLeaveRequests');
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `/employee/get_employee_leave/${user?.id}/${status}`,
      );
      console.log('getLeaveRequests : response', response);
      setIsLoading(false);

      if (response.status) {
        return response.data;
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
        return [];
      }
    } catch (error) {
      setIsLoading(false);
      console.error('getLeaveRequests:', error);
      showToast.error(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
      return [];
    }
  };
  const handleStatusChange = async ({ id, status, reason, onSuccess }) => {
    console.log('handleStatusChange : id', id);
    console.log('handleStatusChange : status', status);
    try {
      const response = await apiClient.post(`employer/approve/${id}`, {
        status: status.toLowerCase(),
        reason,
      });
      console.log('handleStatusChange : response', response);
      if (response.status) {
        showToast.success(
          'Success',
          response?.message || 'Leave status updated',
        );
        getLeaveRequests();
        onSuccess?.();
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
      }
    } catch (e) {
      console.log(`${TAG} : handleStatusChange : error`, e);
      showToast.error(
        'Error',
        e?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddLeave = async ({ requestData, itemToEdit, onSuccess }) => {
    try {
      console.log('handleAddLeave : requestData', requestData);
      const formData = new FormData();
      formData.append('employee_id', user?.id);
      formData.append('start_date', requestData.start_date);
      formData.append('end_date', requestData.end_date);
      formData.append('type', requestData.type);
      formData.append('status', 'pending');
      if (requestData.note) formData.append('note', requestData.note);
      if (requestData?.document?.type)
        formData.append('document', requestData.document);
      setAddingLeave(true);
      const response = await apiClient.post('employee/sick', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('handleAddLeave : response', response);
      if (response.status) {
        showToast.success('Success', response?.message || 'Leave added');
        getLeaveRequests();
        onSuccess?.();
      } else {
        showToast.error('Error', response?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('handleAddLeave : error', error);
      showToast.error(
        'Error',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setAddingLeave(false);
    }
  };

  return (
    <LeaveRequestsContext.Provider
      value={{
        leaveRequests,
        getLeaveRequests,
        isLoading,
        handleStatusChange,
        handleAddLeave,
        addingLeave,
      }}
    >
      {children}
    </LeaveRequestsContext.Provider>
  );
};

export const useLeaveRequests = () => {
  const context = useContext(LeaveRequestsContext);
  if (!context) {
    throw new Error(
      'useLeaveRequests must be used within a LeaveRequestsProvider',
    );
  }
  return context;
};
