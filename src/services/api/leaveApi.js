import { get, post, put, del } from '../common/apiService';
import ENDPOINTS from './endpoints';

export const leaveApi = {
  getLeaves: (params = {}) => get(ENDPOINTS.LEAVES.LIST, params),

  getLeave: id => get(ENDPOINTS.LEAVES.DETAIL(id)),

  createLeave: data => post(ENDPOINTS.LEAVES.CREATE, data),

  updateLeave: (id, data) => put(ENDPOINTS.LEAVES.UPDATE(id), data),

  deleteLeave: id => del(ENDPOINTS.LEAVES.DELETE(id)),

  approveLeave: id => post(ENDPOINTS.LEAVES.APPROVE(id)),

  rejectLeave: id => post(ENDPOINTS.LEAVES.REJECT(id)),

  getMyLeaves: (params = {}) => get(ENDPOINTS.LEAVES.MY_LEAVES, params),
};
