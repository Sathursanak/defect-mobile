import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { getDefectDistributionByType, DefectTypeItem } from '../services/defectDistributionByType';

interface DefectDistributionChartProps {
  projectId: number;
}

const DefectDistributionChart: React.FC<DefectDistributionChartProps> = ({
  projectId,
}) => {
  const widthAndHeight = 220;
  const [defectData, setDefectData] = useState<DefectTypeItem[]>([]);
  const [totalValidDefects, setTotalValidDefects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefectDistribution = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDefectDistributionByType(projectId);
        setDefectData(data.defect_types);
        setTotalValidDefects(data.total_valid_defects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch defect distribution');
        console.error('Error fetching defect distribution:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefectDistribution();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading defect distribution...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // All defect types returned by API now have valid defects > 0
  const typeSeries = defectData.map(item => ({
    value: item.valid_defects,
    color: item.defect_type_color,
    label: { text: item.defect_type_name, fontSize: 10 },
    originalValue: item.valid_defects
  }));

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={widthAndHeight} series={typeSeries} />
      <View style={styles.legendContainer}>
        {typeSeries.map((item, index) => {
          const percentage = totalValidDefects > 0 ? ((item.originalValue / totalValidDefects) * 100).toFixed(1) : '0.0';
          return (
            <Text key={index} style={styles.legend}>
              <Text style={{ color: item.color }}>⬤</Text> {item.label?.text}:{' '}
              {item.originalValue} ({percentage}%)
            </Text>
          );
        })}
        <Text style={[styles.total, { marginTop: 8 }]}>
          {totalValidDefects} Total Valid Defects
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  legendContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  legend: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  common: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ea4335',
    textAlign: 'center',
    padding: 20,
  },
  totalNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default DefectDistributionChart;
