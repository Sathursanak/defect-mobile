import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';

interface DefectDensityMeterProps {
  value: number;
  size?: number;
  title?: string;
  unit?: string;
}

const DefectDensityMeter: React.FC<DefectDensityMeterProps> = ({
  value,
  size = 200,
  title = 'Defect Density',
}) => {
  // Define 3 color segments for the speedometer
  const speedometerLabels = [
    {
      name: 'Low',
      labelColor: '#10b981',
      activeBarColor: '#10b981',
    },
    {
      name: 'Medium',
      labelColor: '#f59e0b',
      activeBarColor: '#f59e0b',
    },
    {
      name: 'High',
      labelColor: '#ef4444',
      activeBarColor: '#ef4444',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNSpeedometer
        value={value}
        size={size}
        minValue={0}
        maxValue={12}
        labels={speedometerLabels}
        allowedDecimals={2}
        showLabels={false}
        showPercent={false}
        showIndicator={true}
        showTicks={true}
        tickInterval={2}
        tickLabelStyle={{
          fontSize: 12,
          color: '#374151',
          fontWeight: '600',
        }}
        tickStyle={{
          backgroundColor: '#374151',
          width: 2,
          height: 8,
        }}
        indicatorStyle={{
          backgroundColor: '#1e3a8a',
        }}
        labelStyle={{
          opacity: 0,
        }}
        labelNoteStyle={{
          opacity: 0,
        }}
      />
      <Text style={styles.valueText}>{value.toFixed(2)}</Text>
      <Text style={styles.unitText}>defects/1000 LOC</Text>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
          <Text style={styles.legendText}>Low (0-7)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
          <Text style={styles.legendText}>Medium (7-10)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>High (10+)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },

  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    textAlign: 'center',
  },
  unitText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default DefectDensityMeter;
