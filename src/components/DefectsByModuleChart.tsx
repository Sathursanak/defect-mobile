import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';

interface PieSlice {
  value: number;
  color: string;
  label?: {
    text: string;
    fontSize?: number;
    offsetX?: number;
    offsetY?: number;
    fontWeight?: 'bold' | 'normal';
    fontStyle?: 'italic' | 'normal';
    outline?: string;
  };
}

const DefectsByModuleChart: React.FC = () => {
  const widthAndHeight = 220;

  // Mock data for defects by module
  const moduleData: PieSlice[] = [
    { value: 30, color: '#3b82f6', label: { text: 'Auth', fontSize: 10 } },
    { value: 25, color: '#10b981', label: { text: 'Dashboard', fontSize: 10 } },
    { value: 20, color: '#f59e0b', label: { text: 'Reports', fontSize: 10 } },
    { value: 15, color: '#ef4444', label: { text: 'Settings', fontSize: 10 } },
    { value: 10, color: '#8b5cf6', label: { text: 'API', fontSize: 10 } },
  ];

  const total = moduleData.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={widthAndHeight} series={moduleData} />
      <View style={styles.legendContainer}>
        {moduleData.map((module, index) => {
          const percentage = ((module.value / total) * 100).toFixed(1);
          return (
            <Text key={index} style={styles.legend}>
              <Text style={{ color: module.color }}>⬤</Text>{' '}
              {module.label?.text}: {module.value} ({percentage}%)
            </Text>
          );
        })}
        <Text style={[styles.total, { marginTop: 8 }]}>
          {total} Total Defects
        </Text>
        <Text style={styles.common}>
          {moduleData[0].value} Most Common: {moduleData[0].label?.text}
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
});

export default DefectsByModuleChart;
