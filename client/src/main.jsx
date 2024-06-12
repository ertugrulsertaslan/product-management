import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./HomePage.jsx";
import UpdateProduct from "./Components/updateProduct.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/customer/products",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/products",
    element: <App />,
  },
  {
    path: "/products/update/:id",
    element: <UpdateProduct />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
