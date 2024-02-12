import { createHashRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@phantombuster/design-system/components';
import { PhantomsContextProvider } from '@phantombuster/phantoms/state';

import { DefaultErrorPage } from './layout/DefaultErrorPage';
import { RootLayout } from './layout/RootLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PhantomDetailsPage } from './pages/phantoms/PhantomDetailsPage';

/**
 * Using the `HashRouter` because the app will be deployed on GitHub Pages.
 * Unfortunately, GitHub Pages only supports static hosting,
 * and won't redirect to the root index.html file as would any SPA static host
 * like Netlify or Vercel.
 *
 * We preferred to use the `HashRouter` in development too to avoid any potential
 * issues caused by a different behavior between the environments.
 */
const router = createHashRouter([
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
    <ThemeProvider>
      <PhantomsContextProvider>
        <RouterProvider router={router} />
      </PhantomsContextProvider>
    </ThemeProvider>
  );
}
