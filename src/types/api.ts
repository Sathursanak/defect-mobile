// API Types for the project

export interface ApiProject {
  id: number;
  project_id: string;
  project_name: string;
  description: string;
  project_status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  start_date: string;
  end_date: string;
  client_name: string;
  country: string;
  state: string;
  email: string;
  phone_no: string;
  user_Id: number;
  kloc: number;
}

export interface DefectData {
  total: number;
  reopen: number;
  closed: number;
  new: number;
  reject: number;
  open: number;
  duplicate: number;
  fixed: number;
}

// New types for severity breakdown API
export interface StatusBreakdownItem {
  status_id: number;
  status_name: string;
  status_color: string;
  count: number;
}

export interface SeverityBreakdownItem {
  severity_id: number;
  severity_name: string;
  severity_color: string;
  weight: string;
  total_defects: number;
  status_breakdown: Record<string, StatusBreakdownItem>;
}

export interface SeverityIndexItem {
  id: number;
  project_name: string;
  valid_defects: number;
  severity_index_percent: number;
  severity_index_level: string;
  severity_index_color: string;
}

// Defect distribution by type types
export interface DefectTypeItem {
  defect_type_id: number;
  defect_type_name: string;
  defect_type_color: string;
  total_defects: number;
  valid_defects: number;
  percentage: number;
}

export interface DefectDistributionResponse {
  total_valid_defects: number;
  defect_types: DefectTypeItem[];
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  statusCode: number;
}

export type ProjectsApiResponse = ApiProject[];

// Transformed project data for the app
export interface ProjectData {
  id: number;
  name: string;
  risk: string;
  defectData: Record<string, DefectData>;
}
