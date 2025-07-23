import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import BackButton from '../components/BackButton';
import RoundIcon from '../components/RoundIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import StatusCard from '../components/StatusCard';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';

const STATUS_CARDS = [
  {
    key: 'high',
    label: 'High Risk Projects',
    count: 5,
    desc: 'Immediate attention required',
    color: '#c62828',
    icon: <Ionicons name="alert-circle-outline" size={36} color="#c62828" />,
  },
  {
    key: 'medium',
    label: 'Medium Risk Projects',
    count: 0,
    desc: 'Monitor progress closely',
    color: '#f9a825',
    icon: <Ionicons name="time-outline" size={36} color="#f9a825" />,
  },
  {
    key: 'low',
    label: 'Low Risk Projects',
    count: 6,
    desc: 'Stable and on track',
    color: '#2ecc40',
    icon: <Ionicons name="checkmark-circle-outline" size={36} color="#2ecc40" />,
  },
];

const PROJECTS: { name: string; risk: RiskLevel }[] = [
  { name: 'Defect Tracker', risk: 'high' },
  { name: 'QA testing', risk: 'high' },
  { name: 'project 1', risk: 'low' },
  { name: 'Heart', risk: 'low' },
  { name: 'Project X', risk: 'low' },
  { name: 'Project Y', risk: 'low' },
];

const RISK_COLORS = {
  high: '#c62828',
  medium: '#f9a825',
  low: '#2ecc40',
};

const RISK_LABELS = {
  high: 'High Risk',
  medium: 'Medium Risk',
  low: 'Low Risk',
};

// Define RiskLevel type
type RiskLevel = 'high' | 'medium' | 'low';

const FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'high', label: 'High Risk' },
  { key: 'medium', label: 'Medium Risk' },
  { key: 'low', label: 'Low Risk' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 10;
const PROJECT_CARD_SIZE = Math.max((SCREEN_WIDTH - 4 * CARD_MARGIN) / 2, 140);

const Dashboard = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects =
    selectedFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.risk === selectedFilter);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Header title="Dashboard Overview" onBack={() => navigation.goBack()}>
        <Text style={styles.subtitle}>
          Gain insights into your projects with real-time health metrics and status summaries
        </Text>
      </Header>

      <View style={styles.statusCardsRow}>
        {STATUS_CARDS.map((card) => (
          <StatusCard
            key={card.key}
            icon={card.icon}
            label={card.label}
            count={card.count}
            desc={card.desc}
            color={card.color}
          />
        ))}
      </View>

      <View style={styles.projectsSection}>
        <Text style={styles.sectionTitle}>All Projects</Text>
        <View style={styles.filtersRow}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && [styles.filterButtonActive, filter.key === 'high' && { borderColor: '#c62828' }, filter.key === 'medium' && { borderColor: '#f9a825' }, filter.key === 'low' && { borderColor: '#2ecc40' }],
              ]}
              onPress={() => setSelectedFilter(filter.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive,
                  filter.key === 'high' && { color: '#c62828' },
                  filter.key === 'medium' && { color: '#f9a825' },
                  filter.key === 'low' && { color: '#2ecc40' },
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.projectsRowScroll}>
          <View style={styles.projectsRow}>
            {filteredProjects.length === 0 ? (
              <Text style={styles.noProjectsText}>No projects found for this filter.</Text>
            ) : (
              filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.name + idx}
                  name={project.name}
                  risk={project.risk}
                  riskColor={RISK_COLORS[project.risk] || '#1a2a5c'}
                  riskLabel={RISK_LABELS[project.risk]}
                  icon={<Ionicons name="checkmark-done-outline" size={48} color="#fff" />}
                  size={PROJECT_CARD_SIZE}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: 'fffff',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: 28,
    left: 0,
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a2a5c',
    marginBottom: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 2,
  },
  statusCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 18,
    marginTop: 8,
  },
  statusCard: {
    flex: 1,
    minWidth: 110,
    maxWidth: 140,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 8,
  },
  statusCardLabel: {
    fontSize: 15,
    color: '#1a2a5c',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  statusCardCount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  statusCardDesc: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  projectsSection: {
    marginTop: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2a5c',
    marginBottom: 12,
    marginLeft: 4,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 18,
    marginLeft: 2,
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  filterButtonActive: {
    backgroundColor: '#e6eeff',
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a2a5c',
  },
  filterButtonTextActive: {
    color: '#1a2a5c',
    textDecorationLine: 'underline',
  },
  projectsRowScroll: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  projectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  projectCardWrapper: {
    alignItems: 'center',
    marginRight: CARD_MARGIN,
    marginBottom: CARD_MARGIN,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  projectCircleShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a2a5c',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  riskLabelWrapper: {
    marginTop: 2,
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 2,
  },
  noProjectsText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 24,
    marginLeft: 8,
  },
});

export default Dashboard;
