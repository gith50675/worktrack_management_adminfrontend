import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import ReportPage from "./pages/ReportPage";
import ProjectsPage from "./pages/ProjectsPage";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Productivity from "./pages/Productivity";
import EmployeeProductivityPage from "./pages/EmployeeProductivityPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import DashboardWorkDetails from "./pages/DashboardWorkDetails";
import KanbanBoardPage from "./pages/KanbanBoardPage";
import NewTaskPage from "./pages/NewTaskPage";
import ResponsiveLayout from "./pages/ResponsiveLayout";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import { Toaster } from "react-hot-toast";
import AdminAuthGuard from "./auth/AdminAuthGuard";
import Users from "./pages/UsersPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AdminAuthGuard>
          <Layout />
        </AdminAuthGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "workersdetail", element: <DashboardWorkDetails /> },
        { path: "tasks", element: <TaskPage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "newproject", element: <NewProjectPage /> },
        { path: "projectdetail/:id", element: <ProjectDetailPage /> },
        { path: "productivity", element: <Productivity /> },
        { path: "employeeproductivity/:id", element: <EmployeeProductivityPage /> },
        { path: "report", element: <ReportPage /> },
        { path: "settings", element: <SettingsPage /> },
        { path: "notifications", element: <NotificationsPage /> },
        { path: "kanbanBoard", element: <KanbanBoardPage /> },
        { path: "newtask", element: <NewTaskPage /> },
        { path: "responsive", element: <ResponsiveLayout /> },
        { path: "taskdetails/:id", element: <TaskDetailsPage /> },
        { path: "users", element: <Users /> },
        {
          path: "users/create",
          element: <SignupPage />
        }

      ],
    },
    {
      path: "/signup",
      element: (
        <Navigate
          to="/login"
          replace
          state={{
            reason: "signup-disabled"
          }}
        />
      )
    },
    { path: "/login", element: <LoginPage /> },

  ]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '16px 24px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          },
          success: {
            style: {
              border: '1.5px solid rgba(139, 92, 246, 0.6)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.2)',
            },
            iconTheme: {
              primary: '#e879f9',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              border: '1.5px solid rgba(239, 68, 68, 0.6)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 10px rgba(239, 68, 68, 0.2)',
            },
            iconTheme: {
              primary: '#f87171',
              secondary: '#fff',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}
export default App;