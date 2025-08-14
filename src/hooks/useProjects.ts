import { useState, useEffect, useCallback } from 'react';
import { projectApi } from '../services/projectApi';
import { ProjectData } from '../types/api';

interface UseProjectsReturn {
  projects: ProjectData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getProjectByName: (name: string) => ProjectData | undefined;
}

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      console.log('🔄 useProjects: Starting to fetch projects...');
      setLoading(true);
      setError(null);

      // Test connection first
      const isConnected = await projectApi.testConnection();
      if (!isConnected) {
        throw new Error('Cannot connect to API server. Check if server is running and accessible.');
      }

      const fetchedProjects = await projectApi.getProjects();
      console.log('📦 useProjects: Received projects:', fetchedProjects.length, 'projects');
      console.log('📋 useProjects: Project details:', fetchedProjects.map(p => ({ name: p.name, risk: p.risk })));
      setProjects(fetchedProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      console.error('❌ useProjects: Error fetching projects:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('✅ useProjects: Fetch completed');
    }
  }, []);

  const getProjectByName = useCallback((name: string): ProjectData | undefined => {
    return projects.find(project => project.name === name);
  }, [projects]);

  const refetch = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch,
    getProjectByName,
  };
};

export default useProjects;
