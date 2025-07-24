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

const DefectDistributionChart: React.FC = () => {
  const widthAndHeight = 220;

  const typeSeries: PieSlice[] = [
    { value: 245, color: '#4285F4', label: { text: 'Functionality', fontSize: 10 } },
    { value: 81, color: '#00bfae', label: { text: 'UI', fontSize: 10 } },
    { value: 30, color: '#fbbc05', label: { text: 'Usability', fontSize: 10 } },
    { value: 103, color: '#ea4335', label: { text: 'Validation', fontSize: 10 } },
  ];

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={widthAndHeight} series={typeSeries} />
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>
          <Text style={{ color: '#4285F4' }}>⬤</Text> Functionality: 245 (53.4%)
        </Text>
        <Text style={styles.legend}>
          <Text style={{ color: '#00bfae' }}>⬤</Text> UI: 81 (17.6%)
        </Text>
        <Text style={styles.legend}>
          <Text style={{ color: '#fbbc05' }}>⬤</Text> Usability: 30 (6.5%)
        </Text>
        <Text style={styles.legend}>
          <Text style={{ color: '#ea4335' }}>⬤</Text> Validation: 103 (22.4%)
        </Text>
        <Text style={[styles.total, { marginTop: 8 }]}>459 Total Defects</Text>
        <Text style={styles.common}>245 Most Common: Functionality</Text>
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

export default DefectDistributionChart;
