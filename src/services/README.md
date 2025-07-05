# API Integration Architecture

## Overview

This project uses TanStack Query (React Query) for efficient API integration with the following structure:

## File Structure

```
src/
├── services/
│   ├── common/
│   │   └── apiService.js          # Base axios configuration
│   └── api/
│       ├── endpoints.js           # Centralized endpoint definitions
│       ├── employeeApi.js         # Employee-specific API calls
│       ├── leaveApi.js           # Leave-specific API calls
│       ├── authApi.js            # Auth-specific API calls
│       └── index.js              # Centralized exports
├── hooks/
│   ├── common/
│   │   └── useQueryClient.js     # TanStack Query configuration
│   └── api/
│       ├── useEmployees.js       # Employee data hooks
│       ├── useLeaves.js          # Leave data hooks
│       ├── useAuth.js            # Auth hooks
│       └── index.js              # Centralized exports
```

## Key Features

### 1. **Centralized API Configuration**

- Single base URL configuration
- Automatic token management
- Centralized error handling
- Request/response interceptors

### 2. **Organized Endpoints**

- All endpoints defined in one place
- Easy to maintain and update
- Type-safe endpoint generation

### 3. **TanStack Query Integration**

- Automatic caching and background updates
- Optimistic updates
- Error handling and retries
- Loading states management

### 4. **Custom Hooks**

- Reusable data fetching logic
- Automatic cache invalidation
- Optimized re-renders

## Usage Examples

### Basic Data Fetching

```javascript
import { useEmployees } from '../hooks/api';

const MyComponent = () => {
  const { data, isLoading, error } = useEmployees();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <EmployeeList employees={data} />;
};
```

### Mutations (Create/Update/Delete)

```javascript
import { useCreateEmployee, useUpdateEmployee } from '../hooks/api';

const MyForm = () => {
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const handleSubmit = data => {
    createEmployee.mutate(data, {
      onSuccess: () => {
        // Handle success
      },
      onError: error => {
        // Handle error
      },
    });
  };
};
```

### Authentication

```javascript
import { useLogin, useProfile } from '../hooks/api';

const LoginScreen = () => {
  const login = useLogin();
  const { data: profile } = useProfile();

  const handleLogin = credentials => {
    login.mutate(credentials);
  };
};
```

## Best Practices

### 1. **Query Keys**

- Use descriptive, hierarchical query keys
- Include parameters in query keys for proper caching
- Example: `['employees', { department: 'IT' }]`

### 2. **Error Handling**

- Centralized error handling in apiService
- Component-level error states
- User-friendly error messages

### 3. **Loading States**

- Always show loading indicators
- Skeleton screens for better UX
- Optimistic updates for better perceived performance

### 4. **Cache Management**

- Automatic cache invalidation on mutations
- Stale time configuration per query
- Background refetching

### 5. **Performance**

- Automatic request deduplication
- Background updates
- Optimistic updates
- Smart retries

## Configuration

### Base URL

Update the `BASE_URL` in `src/services/common/apiService.js`:

```javascript
const BASE_URL = 'https://your-api-url.com/api';
```

### Query Client Configuration

Modify `src/hooks/common/useQueryClient.js` for:

- Stale time
- Cache time
- Retry logic
- Background refetching

## Adding New API Endpoints

1. **Add endpoint to `endpoints.js`**
2. **Create API service in appropriate file**
3. **Create custom hooks**
4. **Use in components**

Example:

```javascript
// 1. Add to endpoints.js
DEPARTMENTS: {
  LIST: '/departments',
  DETAIL: (id) => `/departments/${id}`,
}

// 2. Create departmentApi.js
export const departmentApi = {
  getDepartments: () => get(ENDPOINTS.DEPARTMENTS.LIST),
  getDepartment: (id) => get(ENDPOINTS.DEPARTMENTS.DETAIL(id)),
};

// 3. Create useDepartments.js
export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: departmentApi.getDepartments,
  });
};

// 4. Use in component
const { data: departments } = useDepartments();
```

## Benefits

1. **Performance**: Automatic caching, background updates, request deduplication
2. **Developer Experience**: Simple hooks, automatic loading/error states
3. **Maintainability**: Centralized configuration, organized structure
4. **User Experience**: Fast loading, optimistic updates, offline support
5. **Scalability**: Easy to add new endpoints and features
