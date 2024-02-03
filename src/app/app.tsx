import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootLayout } from './layout/RootLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <DashboardPage />
      </RootLayout>
    </QueryClientProvider>
  );
}
