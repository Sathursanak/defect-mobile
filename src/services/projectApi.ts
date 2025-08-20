import axios, { AxiosResponse } from 'axios';
import { ApiProject, ProjectsApiResponse, ProjectData, DefectData } from '../types/api';


const API_BASE_URL = 'http://192.168.1.192:3000/api'; // Your computer's IP address

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Function to generate mock defect data for projects that don't have it
const generateMockDefectData = (): {
  high: DefectData;
  medium: DefectData;
  low: DefectData;
} => {
  const generateDefectData = (): DefectData => ({
    total: Math.floor(Math.random() * 30) + 5,
    reopen: Math.floor(Math.random() * 5),
    closed: Math.floor(Math.random() * 20) + 5,
    new: Math.floor(Math.random() * 8) + 1,
    reject: Math.floor(Math.random() * 3),
    open: Math.floor(Math.random() * 10) + 2,
    duplicate: Math.floor(Math.random() * 3),
    fixed: Math.floor(Math.random() * 15) + 5,
  });

  return {
    high: generateDefectData(),
    medium: generateDefectData(),
    low: generateDefectData(),
  };
};

// Function to determine risk level based on project data
const determineRiskLevel = (project: ApiProject): 'high' | 'medium' | 'low' => {
  // Determine risk based on project status and name
  const name = project.project_name.toLowerCase();
  const status = project.project_status;

  // If project is completed or inactive, consider it low risk
  if (status === 'COMPLETED' || status === 'INACTIVE') {
    return 'low';
  }

  // Check project name for risk indicators
  if (name.includes('critical') || name.includes('urgent') || name.includes('high') ||
      name.includes('defect') || name.includes('tracker')) {
    return 'high';
  } else if (name.includes('medium') || name.includes('moderate') || name.includes('test') ||
             name.includes('qa') || name.includes('dashboard')) {
    return 'medium';
  } else {
    // For variety, assign risk based on project ID
    const projectId = project.id;
    if (projectId % 3 === 0) return 'high';
    if (projectId % 3 === 1) return 'medium';
    return 'low';
  }
};

// Transform API project to app project data
const transformApiProjectToProjectData = (apiProject: ApiProject): ProjectData => {
  return {
    name: apiProject.project_name,
    risk: determineRiskLevel(apiProject),
    defectData: generateMockDefectData(), // Generate mock defect data since API doesn't provide it
  };
};

// API Functions
export const projectApi = {
  // Test API connectivity
  async testConnection(): Promise<boolean> {
    try {
      console.log(' Testing API connection to:', API_BASE_URL);
      await apiClient.get('/projects');
      console.log(' API connection test successful');
      return true;
    } catch (error: any) {
      console.error(' API connection test failed:', error.message);
      return false;
    }
  },
  // Get all projects
  async getProjects(): Promise<ProjectData[]> {
    try {
      console.log(' Making API request to:', `${API_BASE_URL}/projects`);
      const response: AxiosResponse<ProjectsApiResponse> = await apiClient.get('/projects');

      console.log(' API Response received:', {
        status: response.status,
        statusText: response.statusText,
        dataType: typeof response.data,
        isArray: Array.isArray(response.data),
        dataLength: Array.isArray(response.data) ? response.data.length : 'N/A',
        firstItem: Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null
      });

      // Since your API returns a direct array, process it directly
      if (Array.isArray(response.data)) {
        // Transform API response to app format
        const projects = response.data.map(transformApiProjectToProjectData);

        console.log(' Successfully fetched and transformed projects:', projects.length);
        console.log('Project names:', projects.map(p => p.name));
        return projects;
      } else {
        console.error('API returned unexpected response format:', response.data);
        console.log('Falling back to mock data');
        return getFallbackProjects();
      }
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);

      // Log more details about the error
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      } else if (error.request) {
        console.error(' No response received:', error.request);
      } else {
        console.error(' Error setting up request:', error.message);
      }

      console.log(' Falling back to mock data');
      // Return fallback data in case of error
      return getFallbackProjects();
    }
  },

  // Get a specific project by name
  async getProjectByName(projectName: string): Promise<ProjectData | undefined> {
    try {
      const projects = await this.getProjects();
      return projects.find(project => project.name === projectName);
    } catch (error) {
      console.error('Failed to fetch project by name:', error);
      return undefined;
    }
  },
};

// Fallback data in case API fails
const getFallbackProjects = (): ProjectData[] => {
  console.warn('Using fallback project data due to API error');
  return [
    {
      name: 'Defect Tracker',
      risk: 'high',
      defectData: {
        high: { total: 15, reopen: 3, closed: 8, new: 4, reject: 1, open: 6, duplicate: 2, fixed: 7 },
        medium: { total: 25, reopen: 5, closed: 15, new: 5, reject: 2, open: 8, duplicate: 3, fixed: 12 },
        low: { total: 35, reopen: 2, closed: 28, new: 5, reject: 1, open: 6, duplicate: 1, fixed: 27 },
      },
    },
    {
      name: 'QA Testing',
      risk: 'medium',
      defectData: {
        high: { total: 8, reopen: 1, closed: 5, new: 2, reject: 0, open: 3, duplicate: 1, fixed: 4 },
        medium: { total: 18, reopen: 3, closed: 12, new: 3, reject: 1, open: 5, duplicate: 2, fixed: 10 },
        low: { total: 22, reopen: 1, closed: 18, new: 3, reject: 0, open: 4, duplicate: 0, fixed: 18 },
      },
    },
  ];
};

export default projectApi;
