import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Dashboard />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
