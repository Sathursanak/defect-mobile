import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import ProjectSelector from '../components/ProjectSelector';
import SeverityBreakdown from '../components/SeverityBreakdown';
import DefectIndicators from './DefectIndicators';

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

  const [selectedProject, setSelectedProject] = useState(initialProject);

  const allProjects = [
    'Defect Tracker',
    'QA testing',
    'API Integration',
    'Database Migration',
    'project 1',
    'Heart',
    'Dashboard testing',
    'JALI',
    'Hello world',
    'dashboard test',
  ];

  const getProjectRisk = (projectName: string) => {
    const projectRiskMap: Record<string, string> = {
      'Defect Tracker': 'high',
      'QA testing': 'high',
      'API Integration': 'medium',
      'Database Migration': 'medium',
      'Hello world': 'medium',
      'project 1': 'low',
      Heart: 'low',
      'Dashboard testing': 'low',
      JALI: 'low',
      'dashboard test': 'low',
    };
    return projectRiskMap[projectName] || 'low';
  };

  const currentRisk = getProjectRisk(selectedProject);

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  const getDefectData = (risk: string) => {
    switch (risk) {
      case 'high':
        return {
          high: {
            total: 112,
            reopen: 3,
            closed: 37,
            new: 50,
            reject: 0,
            open: 5,
            duplicate: 0,
            fixed: 14,
          },
          medium: {
            total: 236,
            reopen: 5,
            closed: 60,
            new: 125,
            reject: 0,
            open: 10,
            duplicate: 1,
            fixed: 33,
          },
          low: {
            total: 97,
            reopen: 1,
            closed: 24,
            new: 50,
            reject: 0,
            open: 0,
            duplicate: 3,
            fixed: 10,
          },
        };
      case 'medium':
        return {
          high: {
            total: 45,
            reopen: 1,
            closed: 15,
            new: 20,
            reject: 0,
            open: 2,
            duplicate: 0,
            fixed: 7,
          },
          medium: {
            total: 89,
            reopen: 2,
            closed: 30,
            new: 40,
            reject: 0,
            open: 5,
            duplicate: 0,
            fixed: 12,
          },
          low: {
            total: 34,
            reopen: 0,
            closed: 12,
            new: 15,
            reject: 0,
            open: 1,
            duplicate: 1,
            fixed: 5,
          },
        };
      default:
        return {
          high: {
            total: 12,
            reopen: 0,
            closed: 8,
            new: 3,
            reject: 0,
            open: 0,
            duplicate: 0,
            fixed: 1,
          },
          medium: {
            total: 25,
            reopen: 1,
            closed: 18,
            new: 5,
            reject: 0,
            open: 1,
            duplicate: 0,
            fixed: 0,
          },
          low: {
            total: 8,
            reopen: 0,
            closed: 6,
            new: 2,
            reject: 0,
            open: 0,
            duplicate: 0,
            fixed: 0,
          },
        };
    }
  };

  const defectData = getDefectData(currentRisk);

  return (
    <ScrollView style={styles.container}>
      <Header title="Project Selection" onBack={() => navigation.goBack()} />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
});

export default ProjectDetails;
