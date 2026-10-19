import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Enrollment from "./pages/Enrollment";
import Personalization from "./pages/Personalization";

const App = () => {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <Overview />,
            },
            {
              path: "enrollments",
              element: <Enrollment />,
            },
            {
              path: "personalization",
              element: <Personalization />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
