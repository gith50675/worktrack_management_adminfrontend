
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


const App = () =>{
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,       // sidebar + navbar fixed
    children: [
      { path: "dashboard", element:<Dashboard /> },  
      {path:"workersdetail",element:<DashboardWorkDetails/>},
      {path: "tasks", element: <TaskPage/>},
      {path:"projects",element:<ProjectsPage/>},
      {path:"newproject",element:<NewProjectPage/>},
      {path:"projectdetail",element:<ProjectDetailPage/>},
      {path:"productivity",element:<Productivity/>},
      {path:"employeeproductivity",element:<EmployeeProductivityPage/>},
      {path: "report", element: <ReportPage/>},
      {path: "settings", element: <SettingsPage/>},
      {path:"notifications",element:<NotificationsPage/>},
      {path: "kanbanBoard", element: <KanbanBoardPage/>},
      {path: "newtask", element:<NewTaskPage/>}
    ],
     
  },
 { index:true, element: <SignupPage /> },    // /auth
      { path: "login", element: <LoginPage /> }, 
  
]);

 return <RouterProvider router={router} />;
}
export default App;
