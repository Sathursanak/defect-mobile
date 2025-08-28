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
