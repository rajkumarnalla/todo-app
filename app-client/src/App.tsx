import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = function () {
  return <RouterProvider router={router} />;
};

export default App;
