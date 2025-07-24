import React from 'react';
import LineChart from './LineChart';

const DefectsByModuleChart: React.FC = () => {
  // Mock data for defects by module over time
  const defectsByModuleData = [
    { x: 'Auth', y: 15 },
    { x: 'Dashboard', y: 12 },
    { x: 'Reports', y: 8 },
    { x: 'Settings', y: 6 },
    { x: 'API', y: 4 },
    { x: 'UI/UX', y: 10 },
    { x: 'Database', y: 7 },
    { x: 'Security', y: 3 },
  ];

  return (
    <LineChart
      data={defectsByModuleData}
      color="#f59e0b"
      yAxisLabel="Defects"
      showTitle={false}
    />
  );
};

export default DefectsByModuleChart;
