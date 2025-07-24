import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefectDensityMeter from '../components/DefectDensityMeter';
import DefectPieCharts from '../components/DefectPieCharts';
import SeverityIndexIndicator from '../components/SeverityIndexIndicator';

interface DefectData {
  total: number;
  reopen: number;
  closed: number;
  new: number;
  reject: number;
  open: number;
  duplicate: number;
  fixed: number;
}

interface DefectIndicatorsProps {
  defectData: {
    high: DefectData;
    medium: DefectData;
    low: DefectData;
  };
}

const DefectIndicators: React.FC<DefectIndicatorsProps> = ({ defectData }) => {
  // Calculate overall metrics
  const totalDefects =
    defectData.high.total + defectData.medium.total + defectData.low.total;

  // Mock data for demonstration - in real app, this would come from props or API
  const linesOfCode = 15000; // Mock lines of code
  const defectDensity =
    linesOfCode > 0 ? ((totalDefects / linesOfCode) * 1000).toFixed(2) : '0.00';

  // Defect Severity Index (weighted average: High=3, Medium=2, Low=1)
  const severityIndex =
    totalDefects > 0
      ? (
          (defectData.high.total * 3 +
            defectData.medium.total * 2 +
            defectData.low.total * 1) /
          totalDefects
        ).toFixed(2)
      : '0.00';

  // Mock data for other metrics
  const totalRemarks = 45; // Mock total remarks
  const defectToRemarkRatio =
    totalRemarks > 0 ? (totalDefects / totalRemarks).toFixed(2) : '0.00';

  const multipleReopenDefects = 8; // Mock defects reopened multiple times

  // Time metrics (in hours)
  const avgTimeToFind = 24.5;
  const avgTimeToFix = 18.2;

  // Defect distribution by type (mock data)
  const defectTypes = [
    {
      type: 'Functional',
      count: Math.floor(totalDefects * 0.4),
      color: '#3b82f6',
    },
    { type: 'UI/UX', count: Math.floor(totalDefects * 0.25), color: '#10b981' },
    {
      type: 'Performance',
      count: Math.floor(totalDefects * 0.15),
      color: '#f59e0b',
    },
    {
      type: 'Security',
      count: Math.floor(totalDefects * 0.1),
      color: '#ef4444',
    },
    {
      type: 'Integration',
      count: Math.floor(totalDefects * 0.1),
      color: '#8b5cf6',
    },
  ];

  // Defects by module (mock data)
  const moduleDefects = [
    {
      module: 'Authentication',
      count: Math.floor(totalDefects * 0.3),
      color: '#3b82f6',
    },
    {
      module: 'Dashboard',
      count: Math.floor(totalDefects * 0.25),
      color: '#10b981',
    },
    {
      module: 'Reports',
      count: Math.floor(totalDefects * 0.2),
      color: '#f59e0b',
    },
    {
      module: 'Settings',
      count: Math.floor(totalDefects * 0.15),
      color: '#ef4444',
    },
    { module: 'API', count: Math.floor(totalDefects * 0.1), color: '#8b5cf6' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Defect Indicators</Text>

      {/* Defect Density with Meter */}
      <View style={styles.indicatorContainer}>
        <DefectDensityMeter
          value={parseFloat(defectDensity)}
          size={180}
          title="Defect Density"
        />
      </View>

      {/* Defect Severity Index */}
      <View style={styles.indicatorContainer}>
        <SeverityIndexIndicator
          value={parseFloat(severityIndex)}
          size={200}
          title="Defect Severity Index"
        />
      </View>

      {/* Defect to Remark Ratio */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="chatbubbles-outline" size={24} color="#10b981" />
          <Text style={styles.containerTitle}>Defect to Remark Ratio</Text>
        </View>
        <Text style={styles.metricValue}>{defectToRemarkRatio}:1</Text>
        <Text style={styles.metricDescription}>
          Ratio of defects to review remarks
        </Text>
      </View>

      {/* Defects Reopened Multiple Times */}
      <View style={styles.indicatorContainer}>
        <DefectPieCharts />
      </View>

      {/* Defect Distribution by Type */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="pie-chart-outline" size={24} color="#8b5cf6" />
          <Text style={styles.containerTitle}>Defect Distribution by Type</Text>
        </View>
        <View style={styles.distributionList}>
          {defectTypes.map((type, index) => (
            <View key={index} style={styles.distributionItem}>
              <View style={styles.distributionHeader}>
                <View
                  style={[
                    styles.distributionDot,
                    { backgroundColor: type.color },
                  ]}
                />
                <Text style={styles.distributionLabel}>{type.type}</Text>
              </View>
              <Text style={styles.distributionValue}>{type.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Time to Find Defects */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="time-outline" size={24} color="#06b6d4" />
          <Text style={styles.containerTitle}>Time to Find Defects</Text>
        </View>
        <Text style={styles.metricValue}>{avgTimeToFind} hours</Text>
        <Text style={styles.metricDescription}>
          Average time from code deployment to defect discovery
        </Text>
      </View>

      {/* Time to Fix Defects */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="build-outline" size={24} color="#84cc16" />
          <Text style={styles.containerTitle}>Time to Fix Defects</Text>
        </View>
        <Text style={styles.metricValue}>{avgTimeToFix} hours</Text>
        <Text style={styles.metricDescription}>
          Average time from defect assignment to resolution
        </Text>
      </View>

      {/* Defects by Module */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="layers-outline" size={24} color="#f97316" />
          <Text style={styles.containerTitle}>Defects by Module</Text>
        </View>
        <View style={styles.distributionList}>
          {moduleDefects.map((module, index) => (
            <View key={index} style={styles.distributionItem}>
              <View style={styles.distributionHeader}>
                <View
                  style={[
                    styles.distributionDot,
                    { backgroundColor: module.color },
                  ]}
                />
                <Text style={styles.distributionLabel}>{module.module}</Text>
              </View>
              <Text style={styles.distributionValue}>{module.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  indicatorContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  metricDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },

  distributionList: {
    marginTop: 12,
  },
  distributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  distributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  distributionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  distributionLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  distributionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default DefectIndicators;
