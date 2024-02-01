import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import Cart from "./components/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Cart",
    element: <Cart />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);