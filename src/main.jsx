import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./screens/Error";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Header from "./components/Header";
import { AuthProvider } from "./context/Auth";
import Preview from "./screens/Preview";
import BookTicket from "./screens/BookTicket";

/**
 * Routing setup for the application...
 *
 *
 */
const router = createBrowserRouter([
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/",
    element: (
      <>
        <Header /> <Home />
      </>
    ),
  },
  {
    path: "/preview",
    element: <Preview />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/bookTicket",
    element: <BookTicket />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);