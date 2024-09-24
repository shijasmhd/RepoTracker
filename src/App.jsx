import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/:tab",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
