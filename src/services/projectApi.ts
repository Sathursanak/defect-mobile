import axios, { AxiosResponse } from "axios";
import { ProjectsApiResponse, ProjectData, DefectData } from "../types/api";

const API_BASE_URL = "http://192.168.8.120:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --- Mock defect data ---
const generateMockDefectData = (): {
  high: DefectData;
  medium: DefectData;
  low: DefectData;
} => {
  const make = (): DefectData => ({
    total: Math.floor(Math.random() * 30) + 5,
    reopen: Math.floor(Math.random() * 5),
    closed: Math.floor(Math.random() * 20) + 5,
    new: Math.floor(Math.random() * 8) + 1,
    reject: Math.floor(Math.random() * 3),
    open: Math.floor(Math.random() * 10) + 2,
    duplicate: Math.floor(Math.random() * 3),
    fixed: Math.floor(Math.random() * 15) + 5,
  });
  return { high: make(), medium: make(), low: make() };
};



// --- API ---
export const projectApi = {
  async testConnection(): Promise<boolean> {
    try {
      await apiClient.get("/projects");
      return true;
    } catch {
      return false;
    }
  },

  async getProjects(): Promise<ProjectData[]> {
    try {
      const response: AxiosResponse<ProjectsApiResponse> = await apiClient.get("/projects");

      if (Array.isArray(response.data)) {
        return response.data.map((p) => ({
          id: p.id,
          name: p.project_name,
          risk: "high",
          defectData: generateMockDefectData(),
        }));
      }
      throw new Error("Unexpected API response");
    } catch (err) {
      console.error("Failed to fetch projects", err);
      throw err;
    }
  },

  async getProjectByName(projectName: string): Promise<ProjectData | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.name === projectName);
  },
};

export default projectApi;
