// Mock data to be used across all pages
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

export interface DefectData {
  total: number;
  reopen: number;
  closed: number;
  new: number;
  reject: number;
  open: number;
  duplicate: number;
  fixed: number;
}

export interface ProjectData {
  name: string;
  risk: 'high' | 'medium' | 'low';
  defectData: {
    high: DefectData;
    medium: DefectData;
    low: DefectData;
  };
}

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'High Priority Defect',
    message: 'Critical bug found in authentication module',
    type: 'error',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    title: 'Defect Fixed',
    message: 'UI alignment issue has been resolved',
    type: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
  {
    id: '3',
    title: 'Code Review Required',
    message: 'New defect fixes need review in Dashboard module',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
  {
    id: '4',
    title: 'Weekly Report',
    message: 'Defect tracking report is ready for download',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight at 2 AM',
    type: 'warning',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
];

// Note: Project data is now fetched from API via projectApi service
// Mock project data has been removed and replaced with API integration

export const getUnreadNotificationCount = (): number => {
  return mockNotifications.filter(notification => !notification.read).length;
};

export const getRecentNotifications = (limit: number = 5): Notification[] => {
  return mockNotifications
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
};

export const markNotificationAsRead = (notificationId: string): void => {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
};

export const markAllNotificationsAsRead = (): void => {
  mockNotifications.forEach(notification => {
    notification.read = true;
  });
};

// Chart data interfaces
export interface ChartDataPoint {
  x: string;
  y: number;
}

export interface PieSlice {
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

// Mock chart data
export const timeToFindData: ChartDataPoint[] = [
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

export const timeToFixData: ChartDataPoint[] = [
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

export const defectsByModuleData: PieSlice[] = [
  { value: 30, color: '#3b82f6', label: { text: 'Auth', fontSize: 10 } },
  { value: 25, color: '#10b981', label: { text: 'Dashboard', fontSize: 10 } },
  { value: 20, color: '#f59e0b', label: { text: 'Reports', fontSize: 10 } },
  { value: 15, color: '#ef4444', label: { text: 'Settings', fontSize: 10 } },
  { value: 10, color: '#8b5cf6', label: { text: 'API', fontSize: 10 } },
];

export const defectsReopenedData: PieSlice[] = [
  { value: 5, color: '#4285F4', label: { text: '2 times', fontSize: 12 } },
  { value: 1, color: '#fbbc05', label: { text: '4 times', fontSize: 12, offsetY: 10 } },
];

export const defectDistributionData: PieSlice[] = [
  { value: 245, color: '#4285F4', label: { text: 'Functionality', fontSize: 10 } },
  { value: 81, color: '#00bfae', label: { text: 'UI', fontSize: 10 } },
  { value: 30, color: '#fbbc05', label: { text: 'Usability', fontSize: 10 } },
  { value: 103, color: '#ea4335', label: { text: 'Validation', fontSize: 10 } },
];

// Other mock metrics
export const mockMetrics = {
  totalRemarks: 45,
  linesOfCode: 15000,
  avgTimeToFind: 24.5,
  avgTimeToFix: 18.2,
};

// Helper function to calculate total defects consistently
export const calculateTotalDefects = (defectData: {
  high: DefectData;
  medium: DefectData;
  low: DefectData;
}): number => {
  return defectData.high.total + defectData.medium.total + defectData.low.total;
};

// Helper function to get defect breakdown for charts
export const getDefectBreakdown = (defectData: {
  high: DefectData;
  medium: DefectData;
  low: DefectData;
}) => {
  const totalDefects = calculateTotalDefects(defectData);

  // Calculate proportional distribution based on total defects
  // Using the severity distribution as the base
  const highProportion = defectData.high.total / totalDefects;
  const mediumProportion = defectData.medium.total / totalDefects;
  const lowProportion = defectData.low.total / totalDefects;

  return {
    totalDefects,
    highProportion,
    mediumProportion,
    lowProportion,
    // For charts, we'll use proportional distribution
    functionality: Math.round(totalDefects * 0.4), // 40% functionality issues
    ui: Math.round(totalDefects * 0.25), // 25% UI issues
    usability: Math.round(totalDefects * 0.15), // 15% usability issues
    validation: Math.round(totalDefects * 0.2), // 20% validation issues
    reopened: defectData.high.reopen + defectData.medium.reopen + defectData.low.reopen,
    fixed: defectData.high.fixed + defectData.medium.fixed + defectData.low.fixed,
  };
};

// Example mock defect data for all severities (for demo/testing horizontal scroll)
export const mockDefectData: Record<string, DefectData> = {
  critical: {
    total: 8,
    reopen: 1,
    closed: 2,
    new: 2,
    reject: 1,
    open: 1,
    duplicate: 0,
    fixed: 1,
  },
  blocker: {
    total: 6,
    reopen: 0,
    closed: 2,
    new: 1,
    reject: 1,
    open: 1,
    duplicate: 0,
    fixed: 1,
  },
  high: {
    total: 12,
    reopen: 2,
    closed: 4,
    new: 3,
    reject: 1,
    open: 1,
    duplicate: 0,
    fixed: 1,
  },
  medium: {
    total: 8,
    reopen: 1,
    closed: 3,
    new: 2,
    reject: 0,
    open: 1,
    duplicate: 1,
    fixed: 0,
  },
  low: {
    total: 5,
    reopen: 0,
    closed: 2,
    new: 1,
    reject: 1,
    open: 1,
    duplicate: 0,
    fixed: 0,
  },
  minor: {
    total: 3,
    reopen: 0,
    closed: 1,
    new: 1,
    reject: 0,
    open: 1,
    duplicate: 0,
    fixed: 0,
  },
  
};
