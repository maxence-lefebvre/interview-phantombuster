import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DashboardPage } from './pages/dashboard/DashboardPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
  );
}
