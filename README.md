# React + TypeScript + Vite

A modern React application featuring real-time product search with React Query integration and performance optimizations.

Interact with this APP at Deployed URL: https://react-search-frontend.vercel.app/ 

## Features

- Built with Vite and TypeScript
- React Query for API data management and caching
- Real-time product search with pagination
- Performance optimizations with React hooks

## Quick Start

```bash
# Clone the repository
git clone <this-repo-url>
cd react-search-frontend

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit `http://localhost:5173` in your browser.

## Environment Setup

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api 
(Backend service can be locally setup i.e. https://github.com/pradeepshrestha14/node-search-backend)
```

## API Integration

The application connects to a REST API endpoint:
```
GET http://localhost:3000/api/search?q="apple"&page=1&limit=10
Backend:repo: https://github.com/pradeepshrestha14/node-search-backend
```

Parameters:
- `q`: Search query string
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

## React Query Integration

```typescript
import { useQuery } from '@tanstack/react-query';

const useSearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['products', query],
    queryFn: ({ pageParam = 1 }) => 
      fetch(`/api/search?q=${query}&page=${pageParam}&limit=10`)
  });
};
```

React Query DevTools are enabled in development mode for debugging:
- View cache data
- Monitor API requests
- Inspect query states
- Force refetch/invalidate queries

## Available Scripts

```bash
yarn dev           # Start development server
yarn build         # Build for production
yarn preview       # Preview production build
yarn test         # Run Vitest tests
yarn coverage     # Generate test coverage
```

## ESLint Configuration

For production applications, enable type-aware lint rules:

```js
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
]);
```

## Performance Optimizations

- React Query caching
- Debounced search input
- Memoization with useMemo/useCallback
- React.memo for pure components

## Development Tools

- React Query DevTools
- TypeScript strict mode
- Hot Module Replacement (HMR)
- ESLint + Prettier integration

## System Requirements

- Node.js
- yarn

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/)

