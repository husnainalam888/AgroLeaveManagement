const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  EMPLOYEES: {
    LIST: '/employees',
    DETAIL: id => `/employees/${id}`,
    CREATE: '/employees',
    UPDATE: id => `/employees/${id}`,
    DELETE: id => `/employees/${id}`,
    BY_DEPARTMENT: dept => `/employees/department/${dept}`,
  },
  DEPARTMENTS: {
    LIST: '/departments',
    DETAIL: id => `/departments/${id}`,
  },
  LEAVES: {
    LIST: '/leaves',
    DETAIL: id => `/leaves/${id}`,
    CREATE: '/leaves',
    UPDATE: id => `/leaves/${id}`,
    APPROVE: id => `/leaves/${id}/approve`,
    REJECT: id => `/leaves/${id}/reject`,
    MY_LEAVES: '/leaves/my-leaves',
  },
  SHIFTS: {
    LIST: '/shifts',
    DETAIL: id => `/shifts/${id}`,
    MY_SHIFTS: '/shifts/my-shifts',
  },
  CALENDAR: {
    EVENTS: '/calendar/events',
    MY_EVENTS: '/calendar/my-events',
  },
};

export default ENDPOINTS;
