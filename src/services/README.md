# API Services

This directory contains all API-related services for the Defect Mobile application.

## Files

### `projectApi.ts`
Main API service for project-related operations:
- `getProjects()`: Fetches all projects from the API
- `getProjectByName(name)`: Fetches a specific project by name
- Includes error handling and fallback data
- Transforms API response to match app's data structure

### `apiConfig.ts`
Configuration constants for API:
- Base URL: `http://localhost:3000/api`
- Timeout settings
- Error messages
- HTTP status codes

### `index.ts`
Barrel export file for clean imports

## Usage

```typescript
import { useProjects } from '../hooks/useProjects';

// In a component
const { projects, loading, error, refetch } = useProjects();
```

## API Integration Features

1. **Error Handling**: Graceful fallback to mock data if API fails
2. **Loading States**: Proper loading indicators
3. **Type Safety**: Full TypeScript support
4. **Retry Mechanism**: Users can retry failed requests
5. **Data Transformation**: API data is transformed to match app's expected format

## Mock Data Removal

The following mock data has been removed from `mockData.ts`:
- `mockProjects` array
- `getProjectData` function

These are now replaced with real API calls through the `projectApi` service.
