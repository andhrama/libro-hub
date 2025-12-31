import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CatalogPage from '@/components/pages/CatalogPage';
import AboutPage from '@/components/pages/AboutPage';
import HomePageMalayalam from '@/components/pages/HomePageMalayalam';
import CatalogPageMalayalam from '@/components/pages/CatalogPageMalayalam';
import AboutPageMalayalam from '@/components/pages/AboutPageMalayalam';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "home-ml",
        element: <HomePageMalayalam />,
      },
      {
        path: "catalog-ml",
        element: <CatalogPageMalayalam />,
      },
      {
        path: "about-ml",
        element: <AboutPageMalayalam />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
