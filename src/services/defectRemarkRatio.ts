import axios from "axios";

const API_BASE_URL = "http://192.168.8.120:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export interface DefectRemarkRatioResponseItem {
  id: number;
  project_name: string;
  kloc: number;
  total_defects: number;
  total_duplicate: number | string;
  total_rejected: number | string;
  valid_defects: number | string;
  defect_to_remark_ratio: number | null;
  defect_to_remark_ratio_percent: number | null;
  remark_ratio_level: string | null;
  remark_ratio_color: string | null;
}

export const getDefectRemarkRatio = async (
  projectId: number
): Promise<DefectRemarkRatioResponseItem[] | DefectRemarkRatioResponseItem> => {
  try {
    const res = await apiClient.get(`/dashboard/defect-remark-ratio/${projectId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching defect remark ratio:", error);
    throw error;
  }
};

export default getDefectRemarkRatio;


