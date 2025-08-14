// Export all API services
export { projectApi } from './projectApi';
export { API_CONFIG, API_ENDPOINTS, API_ERROR_MESSAGES, HTTP_STATUS } from './apiConfig';

// Re-export types for convenience
export type { ApiProject, ProjectsApiResponse, ProjectData, DefectData } from '../types/api';
