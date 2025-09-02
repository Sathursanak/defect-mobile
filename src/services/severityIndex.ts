import axios from "axios";

const API_BASE_URL = "http://192.168.1.49:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export interface SeverityIndexItem {
  id: number;
  project_name: string;
  valid_defects: number;
  severity_index_percent: number | null;
  severity_index_level: string | null;
  severity_index_color: string | null;
}

export const getSeverityIndex = async (
  projectId: number
): Promise<SeverityIndexItem[] | SeverityIndexItem> => {
  try {
    const res = await apiClient.get(`/dashboard/severity-index/${projectId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching severity index:", error);
    throw error;
  }
};

export default getSeverityIndex;


