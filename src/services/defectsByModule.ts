import { API_CONFIG, API_ENDPOINTS } from './apiConfig';

export interface ModuleItem {
  module_id: number;
  module_code: string;
  module_name: string;
  module_color: string;
  total_defects: number;
  valid_defects: number;
  percentage: number;
}

export interface DefectsByModuleResponse {
  total_valid_defects: number;
  modules: ModuleItem[];
}

export interface ApiResponse {
  success: boolean;
  data: DefectsByModuleResponse;
  message: string;
}

export const getDefectsByModule = async (projectId: number): Promise<DefectsByModuleResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/defects-by-module/${projectId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch defects by module');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching defects by module:', error);
    throw error;
  }
};
