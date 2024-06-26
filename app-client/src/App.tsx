import React, { Profiler, ProfilerOnRenderCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRouter";
import ErrorPage from "./components/ErrorElement";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <ErrorPage/>
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Tasks />,
        errorElement: <ErrorPage/>
      },
      {
        path: "*",
        element: <NotFound />,
        errorElement: <ErrorPage/>
      },
    ],
  },
]);

const App = function () {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
};

export default App;
