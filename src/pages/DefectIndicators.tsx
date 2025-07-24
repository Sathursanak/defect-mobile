import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefectDensityMeter from '../components/DefectDensityMeter';
import SeverityIndexIndicator from '../components/SeverityIndexIndicator';
import DefectRemarkRatioCard from '../components/DefectRemarkRatioCard';
import DefectsReopenedChart from '../components/DefectsReopenedChart';
import DefectDistributionChart from '../components/DefectDistributionChart';
import TimeToFindChart from '../components/TimeToFindChart';
import TimeToFixChart from '../components/TimeToFixChart';
import DefectsByModuleChart from '../components/DefectsByModuleChart';

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
        <DefectRemarkRatioCard
          defectCount={totalDefects}
          remarkCount={totalRemarks}
          title="Defect to Remark Ratio"
        />
      </View>

      {/* Defects Reopened Multiple Times */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="refresh-outline" size={24} color="#f59e0b" />
          <Text style={styles.containerTitle}>
            Defects Reopened Multiple Times
          </Text>
        </View>
        <DefectsReopenedChart />
      </View>

      {/* Defect Distribution by Type */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="pie-chart-outline" size={24} color="#8b5cf6" />
          <Text style={styles.containerTitle}>Defect Distribution by Type</Text>
        </View>
        <DefectDistributionChart />
      </View>

      {/* Time to Find Defects */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="time-outline" size={24} color="#3b82f6" />
          <Text style={styles.containerTitle}>Time to Find Defects</Text>
        </View>
        <TimeToFindChart />
        <Text style={styles.metricDescription}>
          Daily trend of defects discovered over time
        </Text>
      </View>

      {/* Time to Fix Defects */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="build-outline" size={24} color="#10b981" />
          <Text style={styles.containerTitle}>Time to Fix Defects</Text>
        </View>
        <TimeToFixChart />
        <Text style={styles.metricDescription}>
          Daily trend of defects fixed over time
        </Text>
      </View>

      {/* Defects by Module */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="layers-outline" size={24} color="#f59e0b" />
          <Text style={styles.containerTitle}>Defects by Module</Text>
        </View>
        <DefectsByModuleChart />
        <Text style={styles.metricDescription}>
          Distribution of defects across different modules
        </Text>
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
