import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveApi } from '../../services/api';

export const useLeaves = (params = {}) => {
  return useQuery({
    queryKey: ['leaves', params],
    queryFn: () => leaveApi.getLeaves(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useLeave = id => {
  return useQuery({
    queryKey: ['leave', id],
    queryFn: () => leaveApi.getLeave(id),
    enabled: !!id,
  });
};

export const useMyLeaves = (params = {}) => {
  return useQuery({
    queryKey: ['leaves', 'my-leaves', params],
    queryFn: () => leaveApi.getMyLeaves(params),
  });
};

export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveApi.createLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      queryClient.invalidateQueries({ queryKey: ['leaves', 'my-leaves'] });
    },
  });
};

export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => leaveApi.updateLeave(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      queryClient.invalidateQueries({ queryKey: ['leave', id] });
      queryClient.invalidateQueries({ queryKey: ['leaves', 'my-leaves'] });
    },
  });
};

export const useApproveLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveApi.approveLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
};

export const useRejectLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveApi.rejectLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
};
