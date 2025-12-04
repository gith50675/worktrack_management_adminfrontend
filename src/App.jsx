
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import ReportPage from "./pages/ReportPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SignupPage /> },    // /auth
      { path: "login", element: <LoginPage /> },   // /auth/login
    ],
  },

  {
    path: "/",                 // <---- Layout route
    element: <Layout />,       // sidebar + navbar fixed
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Dashboard /> },   // /
      { path: "dashboard", element: "" }, 
      {path: "tasks", element: <TaskPage/>},
      {path: "report", element: <ReportPage/>}


    ],
  },

  
]);

const App = () => <RouterProvider router={router} />;
export default App;
