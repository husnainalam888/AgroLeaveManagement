import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '../../services/api';

export const useEmployees = (params = {}) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => employeeApi.getEmployees(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useEmployee = id => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeApi.getEmployee(id),
    enabled: !!id,
  });
};

export const useEmployeesByDepartment = department => {
  return useQuery({
    queryKey: ['employees', 'department', department],
    queryFn: () => employeeApi.getEmployeesByDepartment(department),
    enabled: !!department,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => employeeApi.updateEmployee(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
