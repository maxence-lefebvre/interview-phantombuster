import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DashboardPage } from './pages/dashboard/DashboardPage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

export function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>
    </MantineProvider>
  );
}
