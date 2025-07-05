import { get, post, put, del } from '../common/apiService';
import ENDPOINTS from './endpoints';

export const employeeApi = {
  getEmployees: (params = {}) => get(ENDPOINTS.EMPLOYEES.LIST, params),

  getEmployee: id => get(ENDPOINTS.EMPLOYEES.DETAIL(id)),

  createEmployee: data => post(ENDPOINTS.EMPLOYEES.CREATE, data),

  updateEmployee: (id, data) => put(ENDPOINTS.EMPLOYEES.UPDATE(id), data),

  deleteEmployee: id => del(ENDPOINTS.EMPLOYEES.DELETE(id)),

  getEmployeesByDepartment: department =>
    get(ENDPOINTS.EMPLOYEES.BY_DEPARTMENT(department)),
};
