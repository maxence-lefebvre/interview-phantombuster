import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultErrorPage } from './layout/DefaultErrorPage';
import { RootLayout } from './layout/RootLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PhantomDetailsPage } from './pages/phantoms/PhantomDetailsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <DefaultErrorPage />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/linkedin-leads', element: <DashboardPage /> },
      { path: '/solutions', element: <DashboardPage /> },
      { path: '/phantoms/:id', element: <PhantomDetailsPage /> },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
