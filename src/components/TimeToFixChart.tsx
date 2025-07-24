import React from 'react';
import LineChart from './LineChart';

const TimeToFixChart: React.FC = () => {
  // Mock data for time to fix defects over 10 days
  const timeToFixData = [
    { x: 'Day 1', y: 3 },
    { x: 'Day 2', y: 2 },
    { x: 'Day 3', y: 4 },
    { x: 'Day 4', y: 3 },
    { x: 'Day 5', y: 2 },
    { x: 'Day 6', y: 3 },
    { x: 'Day 7', y: 2 },
    { x: 'Day 8', y: 1 },
    { x: 'Day 9', y: 2 },
    { x: 'Day 10', y: 2 },
  ];

  return (
    <LineChart
      data={timeToFixData}
      color="#10b981"
      yAxisLabel="Defects Fixed"
      showTitle={false}
    />
  );
};

export default TimeToFixChart;
