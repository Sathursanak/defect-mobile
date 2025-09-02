import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from './apiConfig';

// Types for the severity breakdown API response
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

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

export const severityBreakdownApi = {
  /**
   * Get severity breakdown for a specific project
   * @param projectId - The project ID
   * @returns Promise<SeverityBreakdownItem[]>
   */
  async getSeverityBreakdown(projectId: number): Promise<SeverityBreakdownItem[]> {
    try {
      const response: AxiosResponse<SeverityBreakdownItem[]> = await apiClient.get(
        `/dashboard/severity-breakdown/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch severity breakdown:', error);
      throw error;
    }
  },

  /**
   * Get severity index for a specific project
   * @param projectId - The project ID
   * @returns Promise<SeverityIndexItem[]>
   */
  async getSeverityIndex(projectId: number): Promise<SeverityIndexItem[]> {
    try {
      const response: AxiosResponse<SeverityIndexItem[]> = await apiClient.get(
        `/dashboard/severity-index/${projectId}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch severity index:', error);
      throw error;
    }
  },
};

export default severityBreakdownApi;
