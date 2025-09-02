import { API_CONFIG, API_ENDPOINTS } from './apiConfig';

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

export interface ApiResponse {
  success: boolean;
  data: DefectDistributionResponse;
  message: string;
}

export const getDefectDistributionByType = async (projectId: number): Promise<DefectDistributionResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/defect-distribution-by-type/${projectId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch defect distribution');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching defect distribution by type:', error);
    throw error;
  }
};
