import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import RoundIcon from './RoundIcon';

interface ProjectCardProps {
  name: string;
  risk: string;
  riskColor: string;
  riskLabel: string;
  icon: React.ReactNode;
  size: number;
  style?: ViewStyle;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, risk, riskColor, riskLabel, icon, size, style }) => (
  <View style={[styles.projectCardWrapper, { width: size, height: size }, style]}>
    <RoundIcon size={size - 32} backgroundColor={riskColor} style={styles.projectCircleShadow}>
      {icon}
    </RoundIcon>
    <Text style={styles.projectName}>{name}</Text>
    <View style={styles.riskLabelWrapper}>
      <Text style={[styles.riskLabel, { backgroundColor: riskColor + '22', color: riskColor }]}> {riskLabel} </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  projectCardWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
    marginRight: 10,
    marginBottom: 10,
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
});

export default ProjectCard; 