import React, { useEffect, useState } from 'react';
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
import { calculateTotalDefects } from '../data/mockData';
import { getDefectDensity } from '../services/defectdensity';
import { getDefectRemarkRatio, DefectRemarkRatioResponseItem } from '../services/defectRemarkRatio';
import { getSeverityIndex, SeverityIndexItem } from '../services/severityIndex';

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
  projectId?: number;
}

const DefectIndicators: React.FC<DefectIndicatorsProps> = ({ defectData, projectId }) => {
  const [densityValue, setDensityValue] = useState<number>(0);
  const [densityLoading, setDensityLoading] = useState<boolean>(false);
  const [densityError, setDensityError] = useState<string | null>(null);
  const [densityColor, setDensityColor] = useState<string | undefined>(undefined);
  const [densityLevel, setDensityLevel] = useState<string | undefined>(undefined);

  const [ratioPercent, setRatioPercent] = useState<number | null>(null);
  const [ratioLevel, setRatioLevel] = useState<string | null>(null);
  const [ratioColor, setRatioColor] = useState<string | null>(null);
  const [ratioValidDefects, setRatioValidDefects] = useState<number | null>(null);
  const [ratioTotalDefects, setRatioTotalDefects] = useState<number | null>(null);
  const [ratioLoading, setRatioLoading] = useState<boolean>(false);
  const [ratioError, setRatioError] = useState<string | null>(null);

  // Severity Index states
  const [severityPercent, setSeverityPercent] = useState<number | null>(null);
  const [severityLevel, setSeverityLevel] = useState<string | null>(null);
  const [severityColor, setSeverityColor] = useState<string | null>(null);
  const [severityLoading, setSeverityLoading] = useState<boolean>(false);
  const [severityError, setSeverityError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDensity = async () => {
      if (!projectId) {
        setDensityValue(0);
        return;
      }
      try {
        setDensityLoading(true);
        setDensityError(null);
        const data = await getDefectDensity(projectId);
        const item = Array.isArray(data) ? data[0] : data;
        const value = typeof item?.defect_density === 'number' ? item.defect_density : 0;
        setDensityValue(value);
        setDensityColor(typeof item?.density_color === 'string' ? item.density_color : undefined);
        setDensityLevel(typeof item?.density_level === 'string' ? item.density_level : undefined);
      } catch (e) {
        setDensityError('Failed to load defect density');
        setDensityValue(0);
      } finally {
        setDensityLoading(false);
      }
    };
    fetchDensity();
  }, [projectId]);

  useEffect(() => {
    const fetchSeverityIndex = async () => {
      if (!projectId) {
        setSeverityPercent(null);
        setSeverityLevel(null);
        setSeverityColor(null);
        return;
      }
      try {
        setSeverityLoading(true);
        setSeverityError(null);
        const data = await getSeverityIndex(projectId);
        const item: SeverityIndexItem = Array.isArray(data) ? data[0] : data;
        setSeverityPercent(
          typeof item?.severity_index_percent === 'number' ? item.severity_index_percent : null
        );
        setSeverityLevel(item?.severity_index_level ?? null);
        setSeverityColor(item?.severity_index_color ?? null);
      } catch (e) {
        setSeverityError('Failed to load severity index');
        setSeverityPercent(null);
        setSeverityLevel(null);
        setSeverityColor(null);
      } finally {
        setSeverityLoading(false);
      }
    };
    fetchSeverityIndex();
  }, [projectId]);

  useEffect(() => {
    const fetchRemarkRatio = async () => {
      if (!projectId) {
        setRatioPercent(null);
        setRatioLevel(null);
        setRatioColor(null);
        setRatioValidDefects(null);
        setRatioTotalDefects(null);
        return;
      }
      try {
        setRatioLoading(true);
        setRatioError(null);
        const data = await getDefectRemarkRatio(projectId);
        const item: DefectRemarkRatioResponseItem = Array.isArray(data) ? data[0] : data;
        setRatioPercent(item?.defect_to_remark_ratio_percent ?? null);
        setRatioLevel(item?.remark_ratio_level ?? null);
        setRatioColor(item?.remark_ratio_color ?? null);
        // also keep counts for display consistency
        const parseNum = (v: number | string | null | undefined): number | null => {
          if (v === null || v === undefined) return null;
          const n = typeof v === 'string' ? Number(v) : v;
          return isNaN(Number(n)) ? null : Number(n);
        };
        setRatioValidDefects(parseNum(item?.valid_defects as any));
        setRatioTotalDefects(parseNum(item?.total_defects as any));
      } catch (e) {
        setRatioError('Failed to load defect remark ratio');
        setRatioPercent(null);
        setRatioLevel(null);
        setRatioColor(null);
        setRatioValidDefects(null);
        setRatioTotalDefects(null);
      } finally {
        setRatioLoading(false);
      }
    };
    fetchRemarkRatio();
  }, [projectId]);
  // Calculate overall metrics using centralized function
  const totalDefects = calculateTotalDefects(defectData);

  const defectDensity = densityValue.toFixed(2);

  // Map severity percent (0-100) to component's expected value (0-3)
  const severityIndexValue = severityPercent == null ? 0 : Number(((severityPercent / 100) * 3).toFixed(2));

  // Placeholder until remarks API is integrated
  const totalRemarks = 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Defect Indicators</Text>

      {/* Defect Density with Meter */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="speedometer-outline" size={24} color="#06b6d4" />
          <Text style={styles.containerTitle}>Defect Density</Text>
        </View>
        {densityLoading ? (
          <Text style={styles.metricDescription}>Loading...</Text>
        ) : densityError ? (
          <Text style={[styles.metricDescription, { color: '#ef4444' }]}>{densityError}</Text>
        ) : densityColor && densityLevel ? (
          <DefectDensityMeter
            value={parseFloat(defectDensity)}
            size={180}
            title=""
            color={densityColor}
            level={densityLevel}
          />
        ) : (
          <Text style={styles.metricDescription}>Loading...</Text>
        )}
      </View>

      {/* Defect Severity Index */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="warning-outline" size={24} color="#f59e0b" />
          <Text style={styles.containerTitle}>Defect Severity Index</Text>
        </View>
        {severityLoading ? (
          <Text style={styles.metricDescription}>Loading...</Text>
        ) : severityError ? (
          <Text style={[styles.metricDescription, { color: '#ef4444' }]}>{severityError}</Text>
        ) : (
          <SeverityIndexIndicator
            value={severityIndexValue}
            size={200}
            title=""
          />
        )}
        {severityLevel && (
          <Text style={[styles.metricDescription, { marginTop: 8, color: severityColor || '#374151' }]}>
            Level: {severityLevel}
          </Text>
        )}
      </View>

      {/* Defect to Remark Ratio */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="chatbubbles-outline" size={24} color="#10b981" />
          <Text style={styles.containerTitle}>Defect to Remark Ratio</Text>
        </View>
        {ratioLoading ? (
          <Text style={styles.metricDescription}>Loading...</Text>
        ) : ratioError ? (
          <Text style={[styles.metricDescription, { color: '#ef4444' }]}>{ratioError}</Text>
        ) : (
          <DefectRemarkRatioCard
            defectCount={ratioValidDefects ?? 0}
            remarkCount={ratioTotalDefects ?? 0}
            percentOverride={ratioPercent}
            levelOverride={ratioLevel}
            colorOverride={ratioColor}
            title=""
          />
        )}
      </View>

      {/* Defects Reopened Multiple Times */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="refresh-outline" size={24} color="#f59e0b" />
          <Text style={styles.containerTitle}>
            Defects Reopened Multiple Times
          </Text>
        </View>
        <DefectsReopenedChart defectData={defectData} />
      </View>

      {/* Defect Distribution by Type */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="pie-chart-outline" size={24} color="#8b5cf6" />
          <Text style={styles.containerTitle}>Defect Distribution by Type</Text>
        </View>
        <DefectDistributionChart projectId={projectId || 1} />
      </View>

      {/* Time to Find Defects */}
      <View style={styles.indicatorContainer}>
        <View style={styles.containerHeader}>
          <Ionicons name="time-outline" size={24} color="#3b82f6" />
          <Text style={styles.containerTitle}>Time to Find Defects</Text>
        </View>
        <TimeToFindChart defectData={defectData} />
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
        <TimeToFixChart defectData={defectData} />
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
        <DefectsByModuleChart defectData={defectData} />
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
