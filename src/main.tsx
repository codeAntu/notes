import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Home from "./screens/Home.tsx";
import Add from "./screens/Add.tsx";
import { Route } from "lucide-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Edit from "./screens/Edit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "add",
    element: <Add />,
  },
  {
    path: "edit",
    element: <Edit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
