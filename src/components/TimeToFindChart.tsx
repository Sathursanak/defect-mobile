import React from 'react';
import LineChart from './LineChart';

const TimeToFindChart: React.FC = () => {
  // Mock data for time to find defects over 10 days
  const timeToFindData = [
    { x: 'Day 1', y: 2 },
    { x: 'Day 2', y: 3 },
    { x: 'Day 3', y: 1 },
    { x: 'Day 4', y: 4 },
    { x: 'Day 5', y: 2 },
    { x: 'Day 6', y: 3 },
    { x: 'Day 7', y: 2 },
    { x: 'Day 8', y: 1 },
    { x: 'Day 9', y: 2 },
    { x: 'Day 10', y: 1 },
  ];

  return (
    <LineChart
      data={timeToFindData}
      color="#3b82f6"
      yAxisLabel="Defects Found"
      showTitle={false}
    />
  );
};

export default TimeToFindChart;
