import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TopHeader from '../components/TopHeader';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ProjectSelector from '../components/ProjectSelector';
import SeverityBreakdown from '../components/SeverityBreakdown';
import DefectIndicators from './DefectIndicators';
import { useProjects } from '../hooks/useProjects';

type RootStackParamList = {
  ProjectDetails: {
    projectName: string;
    risk: string;
  };
};

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, 'ProjectDetails'>;

const ProjectDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<ProjectDetailsRouteProp>();
  const { projectName: initialProject } = route.params;
  const { projects, loading, error, refetch, getProjectByName } = useProjects();

  const [selectedProject, setSelectedProject] = useState(initialProject);

  const allProjects = projects.map(project => project.name);

  const getCurrentProjectRisk = () => {
    const projectData = getProjectByName(selectedProject);
    return projectData ? projectData.risk : 'low';
  };

  const currentRisk = getCurrentProjectRisk();

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  const getDefectData = () => {
    const projectData = getProjectByName(selectedProject);
    return projectData
      ? projectData.defectData
      : {
          high: {
            total: 0,
            reopen: 0,
            closed: 0,
            new: 0,
            reject: 0,
            open: 0,
            duplicate: 0,
            fixed: 0,
          },
          medium: {
            total: 0,
            reopen: 0,
            closed: 0,
            new: 0,
            reject: 0,
            open: 0,
            duplicate: 0,
            fixed: 0,
          },
          low: {
            total: 0,
            reopen: 0,
            closed: 0,
            new: 0,
            reject: 0,
            open: 0,
            duplicate: 0,
            fixed: 0,
          },
        };
  };

  const defectData = getDefectData();

  // If projects are loaded but the selected project doesn't exist, select the first available project
  useEffect(() => {
    if (projects.length > 0 && !getProjectByName(selectedProject)) {
      setSelectedProject(projects[0].name);
    }
  }, [projects, selectedProject, getProjectByName]);

  // Show loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <TopHeader title="Project Details" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a2a5c" />
          <Text style={styles.loadingText}>Loading projects...</Text>
        </View>
        <Footer />
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <TopHeader title="Project Details" />
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color="#ef4444" />
          <Text style={styles.errorText}>Failed to load projects</Text>
          <Text style={styles.errorSubText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <TopHeader title={`${selectedProject} Details`} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.projectSelectorContainer}>
          <ProjectSelector
            projects={allProjects}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
          />
        </View>

        <View style={styles.projectHeader}>
          <Text style={styles.projectTitle}>{selectedProject}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  currentRisk === 'high'
                    ? '#c62828'
                    : currentRisk === 'medium'
                    ? '#f9a825'
                    : '#2ecc40',
              },
            ]}
          >
            <Text style={styles.statusText}>
              {currentRisk === 'high'
                ? 'High Risk'
                : currentRisk === 'medium'
                ? 'Medium Risk'
                : 'Low Risk'}
            </Text>
          </View>
        </View>

        <SeverityBreakdown defectData={defectData} />

        <View style={styles.indicatorsContainer}>
          <DefectIndicators defectData={defectData} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100, // Add padding to prevent content from being hidden behind footer
    paddingTop: 80, // Add padding to prevent content from being hidden behind fixed header
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  projectSelectorContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  projectTab: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeProjectTab: {
    backgroundColor: '#3b82f6',
  },
  projectTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeProjectTabText: {
    color: '#fff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a2a5c',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  defectCards: {
    paddingHorizontal: 24,
    gap: 16,
  },
  defectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  defectCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  defectTotal: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  defectStats: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  viewChartButton: {
    alignSelf: 'flex-start',
  },
  viewChartText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  indicatorsContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#1a2a5c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectDetails;
