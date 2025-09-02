// Export all API services
export { projectApi } from './projectApi';
export { API_CONFIG, API_ENDPOINTS, API_ERROR_MESSAGES, HTTP_STATUS } from './apiConfig';
export { getDefectRemarkRatio } from './defectRemarkRatio';
export { getDefectDensity } from './defectdensity';
export { getSeverityIndex } from './severityIndex';
export { severityBreakdownApi } from './severityBreakdown';

// Re-export types for convenience
export type {
  ApiProject,
  ProjectsApiResponse,
  ProjectData,
  DefectData,
  SeverityBreakdownItem,
  StatusBreakdownItem,
  SeverityIndexItem
} from '../types/api';
