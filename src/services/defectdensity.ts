import axios from "axios";


const API_BASE_URL = "http://192.168.8.120:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});


export const getDefectDensity = async (projectId: number) => {
  try {
    const res = await apiClient.get(`/dashboard/defect-density/${projectId}`);
    return res.data; 
  } catch (error) {
    console.error("Error fetching defect density:", error);
    throw error;
  }
};

export default getDefectDensity;
