
export const API_CONFIG = {
  BASE_URL: 'http://192.168.1.49:3000/api', // Your computer's IP address
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/projects',
  PROJECT_BY_ID: (id: string | number) => `/projects/${id}`,
};

// Error messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
