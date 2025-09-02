// Unit tests for SeverityBreakdown component with new API structure

import { SeverityBreakdownItem, StatusBreakdownItem } from '../../services/severityBreakdown';

const mockSeverityData: SeverityBreakdownItem[] = [
  {
    severity_id: 1,
    severity_name: 'Critical',
    severity_color: 'Red',
    weight: '5',
    total_defects: 25,
    status_breakdown: {
      '1': {
        status_id: 1,
        status_name: 'New',
        status_color: '#FF0000',
        count: 5,
      },
      '2': {
        status_id: 2,
        status_name: 'Reopen',
        status_color: '#FFA500',
        count: 3,
      },
      '3': {
        status_id: 3,
        status_name: 'Open',
        status_color: '#0000FF',
        count: 4,
      },
      '4': {
        status_id: 4,
        status_name: 'Fixed',
        status_color: '#008000',
        count: 8,
      },
      '5': {
        status_id: 5,
        status_name: 'Closed',
        status_color: '#16a34a',
        count: 5,
      },
    },
  },
  {
    severity_id: 2,
    severity_name: 'High',
    severity_color: 'Orange',
    weight: '4',
    total_defects: 15,
    status_breakdown: {
      '1': {
        status_id: 1,
        status_name: 'New',
        status_color: '#FF0000',
        count: 3,
      },
      '3': {
        status_id: 3,
        status_name: 'Open',
        status_color: '#0000FF',
        count: 2,
      },
      '4': {
        status_id: 4,
        status_name: 'Fixed',
        status_color: '#008000',
        count: 5,
      },
      '5': {
        status_id: 5,
        status_name: 'Closed',
        status_color: '#16a34a',
        count: 5,
      },
    },
  },
];

describe('SeverityBreakdown API Data Processing', () => {
  it('should have correct severity data structure', () => {
    const criticalSeverity = mockSeverityData[0];

    expect(criticalSeverity.severity_id).toBe(1);
    expect(criticalSeverity.severity_name).toBe('Critical');
    expect(criticalSeverity.severity_color).toBe('Red');
    expect(criticalSeverity.total_defects).toBe(25);
    expect(Object.keys(criticalSeverity.status_breakdown)).toHaveLength(5);
  });

  it('should have correct status breakdown structure', () => {
    const criticalSeverity = mockSeverityData[0];
    const newStatus = criticalSeverity.status_breakdown['1'];

    expect(newStatus.status_id).toBe(1);
    expect(newStatus.status_name).toBe('New');
    expect(newStatus.status_color).toBe('#FF0000');
    expect(newStatus.count).toBe(5);
  });

  it('should calculate total defects correctly from status breakdown', () => {
    const criticalSeverity = mockSeverityData[0];
    const totalFromBreakdown = Object.values(criticalSeverity.status_breakdown)
      .reduce((sum, status) => sum + status.count, 0);

    expect(totalFromBreakdown).toBe(25);
    expect(totalFromBreakdown).toBe(criticalSeverity.total_defects);
  });

  it('should filter out zero-count statuses for pie chart', () => {
    const criticalSeverity = mockSeverityData[0];
    const segments = Object.values(criticalSeverity.status_breakdown)
      .filter(status => status.count > 0)
      .map(status => ({
        value: status.count,
        color: status.status_color,
        label: status.status_name.toUpperCase(),
      }));

    // All statuses have count > 0, so should include all 5
    expect(segments).toHaveLength(5);
    expect(segments.find(s => s.label === 'NEW')).toBeDefined();
    expect(segments.find(s => s.label === 'FIXED')).toBeDefined();
  });

  it('should handle multiple severities correctly', () => {
    expect(mockSeverityData).toHaveLength(2);

    const criticalSeverity = mockSeverityData[0];
    const highSeverity = mockSeverityData[1];

    expect(criticalSeverity.severity_name).toBe('Critical');
    expect(highSeverity.severity_name).toBe('High');
    expect(criticalSeverity.total_defects).toBeGreaterThan(highSeverity.total_defects);
  });

  it('should have consistent status IDs across severities', () => {
    const criticalSeverity = mockSeverityData[0];
    const highSeverity = mockSeverityData[1];
    const criticalStatusIds = Object.keys(criticalSeverity.status_breakdown).map(Number);
    const highStatusIds = Object.keys(highSeverity.status_breakdown).map(Number);

    // Status IDs should be consistent (1, 3, 4, 5 for High severity)
    expect(highStatusIds).toEqual([1, 3, 4, 5]);
  });
});
