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

const DefectsReopenedChart: React.FC = () => {
  const widthAndHeight = 220;

  const reopenedSeries: PieSlice[] = [
    { value: 5, color: '#4285F4', label: { text: '2 times', fontSize: 12 } },
    { value: 1, color: '#fbbc05', label: { text: '4 times', fontSize: 12, offsetY: 10 } },
  ];

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={widthAndHeight} series={reopenedSeries} />
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>
          <Text style={{ color: '#4285F4' }}>⬤</Text> 2 times: 5 (83.3%)
        </Text>
        <Text style={styles.legend}>
          <Text style={{ color: '#fbbc05' }}>⬤</Text> 4 times: 1 (16.7%)
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
});

export default DefectsReopenedChart;
