# Severity Breakdown Backend Integration

## Overview

The `SeverityBreakdown` component has been successfully integrated with the backend API to provide dynamic, real-time defect severity data based on project selection.

## What Changed

### 1. Component Interface
- **Before**: Component received static `defectData` as props
- **After**: Component now receives `projectId` as props and fetches data dynamically

### 2. API Integration
- New service: `severityBreakdownApi` in `src/services/severityBreakdown.ts`
- Fetches data from: `GET /api/dashboard/severity-breakdown/{projectId}`
- Supports severity index: `GET /api/dashboard/severity-index/{projectId}`

### 3. Data Structure
The component now works with the actual API response structure:

```typescript
interface SeverityBreakdownItem {
  severity_id: number;
  severity_name: string;
  severity_color: string;
  weight: string;
  total_defects: number;
  status_breakdown: Record<string, StatusBreakdownItem>;
}

interface StatusBreakdownItem {
  status_id: number;
  status_name: string;
  status_color: string;
  count: number;
}
```

## How It Works

### 1. Dynamic Data Fetching
- Component automatically fetches data when `projectId` changes
- Uses `useEffect` hook to trigger API calls
- Handles loading, error, and empty states

### 2. Real-time Updates
- Severity boxes dynamically change based on project selection
- Defect status counts update automatically
- Colors and labels come from the backend

### 3. Responsive Design
- Maintains the existing card-based layout
- Horizontal scrolling with navigation arrows
- Responsive card sizing based on screen width

## Usage

### Basic Usage
```tsx
import SeverityBreakdown from '../components/SeverityBreakdown';

// In your component
<SeverityBreakdown projectId={currentProjectId} />
```

### Project Details Integration
The component is already integrated in `ProjectDetails.tsx`:

```tsx
<SeverityBreakdown projectId={getCurrentProjectId() || 1} />
```

## API Endpoints

### 1. Severity Breakdown
```
GET /api/dashboard/severity-breakdown/{projectId}
```

**Response Example:**
```json
[
  {
    "severity_id": 1,
    "severity_name": "Critical",
    "severity_color": "Red",
    "weight": "5",
    "total_defects": 9,
    "status_breakdown": {
      "1": {
        "status_id": 1,
        "status_name": "New",
        "status_color": "#FF0000",
        "count": 6
      },
      "2": {
        "status_id": 2,
        "status_name": "Reopen",
        "status_color": "#FFA500",
        "count": 2
      }
    }
  }
]
```

### 2. Severity Index
```
GET /api/dashboard/severity-index/{projectId}
```

**Response Example:**
```json
[
  {
    "id": 2,
    "project_name": "Testing",
    "valid_defects": 5,
    "severity_index_percent": 65.71,
    "severity_index_level": "Red",
    "severity_index_color": "red"
  }
]
```

## Features

### 1. Loading States
- Shows loading spinner while fetching data
- Displays "Loading severity data..." message

### 2. Error Handling
- Shows error message if API call fails
- Provides retry button to attempt again
- Graceful fallback for network issues

### 3. Empty States
- Handles cases where no severity data exists
- Shows appropriate message for empty projects

### 4. Interactive Charts
- Click "View Chart" to see detailed pie chart
- Modal displays breakdown with percentages
- Dynamic legend based on actual data

## Color Mapping

The component maps backend color names to hex values:

```typescript
const colorMap: Record<string, string> = {
  'Red': '#dc2626',
  'Orange': '#ea580c',
  'Yellow': '#ca8a04',
  'Green': '#16a34a',
  'Blue': '#2563eb',
  'Purple': '#9333ea',
};
```

## Testing

Updated test file: `src/components/__tests__/SeverityBreakdown.test.tsx`
- Tests the new API data structure
- Validates data processing logic
- Ensures proper filtering and calculations

## Benefits

1. **Real-time Data**: Always shows current project information
2. **Dynamic Updates**: Automatically refreshes when project changes
3. **Backend Consistency**: Uses actual database values, not mock data
4. **Scalable**: Supports any number of severities and statuses
5. **Maintainable**: Centralized API service for easy updates

## Future Enhancements

1. **Caching**: Implement data caching for better performance
2. **Real-time Updates**: WebSocket integration for live updates
3. **Offline Support**: Store data locally for offline viewing
4. **Filters**: Add date range and other filtering options
5. **Export**: Allow exporting severity reports

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running
   - Verify API endpoint URLs in `apiConfig.ts`
   - Check network connectivity

2. **No Data Displayed**
   - Verify project ID is correct
   - Check if project has severity data
   - Review API response format

3. **Component Not Updating**
   - Ensure `projectId` prop changes when project switches
   - Check `useEffect` dependency array
   - Verify API call is successful

### Debug Mode
Enable console logging to see API calls and responses:
```typescript
// In severityBreakdown.ts
console.log('API Response:', response.data);
```
