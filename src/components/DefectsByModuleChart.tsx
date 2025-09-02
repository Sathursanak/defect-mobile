import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { getDefectsByModule, ModuleItem } from '../services/defectsByModule';

interface DefectsByModuleChartProps {
  projectId: number;
}

const DefectsByModuleChart: React.FC<DefectsByModuleChartProps> = ({
  projectId,
}) => {
  const widthAndHeight = 220;
  const [moduleData, setModuleData] = useState<ModuleItem[]>([]);
  const [totalValidDefects, setTotalValidDefects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefectsByModule = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDefectsByModule(projectId);
        setModuleData(data.modules);
        setTotalValidDefects(data.total_valid_defects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch defects by module');
        console.error('Error fetching defects by module:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefectsByModule();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading defects by module...</Text>
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

  // All modules returned by API now have valid defects > 0
  const moduleSeries = moduleData.map(item => ({
    value: item.valid_defects,
    color: item.module_color,
    label: { text: item.module_name, fontSize: 10 },
    originalValue: item.valid_defects
  }));

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={widthAndHeight} series={moduleSeries} />
      <View style={styles.legendContainer}>
        {moduleSeries.map((item, index) => {
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
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
});

export default DefectsByModuleChart;
