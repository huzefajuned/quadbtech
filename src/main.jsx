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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tickets from "./screens/Tickets";

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
    element: (
      <>
        <Header /> <Preview />
      </>
    ),
  },

  {
    path: "/login",
    element: (
      <>
        <Header /> <Login />
      </>
    ),
  },
  {
    path: "/bookTicket",
    element: (
      <>
        <Header />
        <BookTicket />
      </>
    ),
  },
  {
    path: "/tickets",
    element: (
      <>
        <Header />
        <Tickets />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Flip
    />
  </React.StrictMode>
);
