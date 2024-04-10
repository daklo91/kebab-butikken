import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Report from "./routes/sender/Report.jsx";
import ThankYou from "./routes/sender/ThankYou.jsx";
import ReportList from "./routes/reciever/ReportList.jsx";
import ReportOverview from "./routes/reciever/ReportOverview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "raporter",
    element: <Report />,
  },
  {
    path: "takk",
    element: <ThankYou />,
  },
  {
    path: "raport-liste",
    element: <ReportList />,
  },
  {
    path: "raport/:reportID",
    element: <ReportOverview />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
