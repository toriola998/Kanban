import { StrictMode } from "react";
import App from "./routes/Home.jsx";

//import { createRoot } from 'react-dom/client'
import "./styles/index.css";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
   <>
      <ToastContainer theme="colored" />
      <StrictMode>
         <RouterProvider router={router} />
      </StrictMode>
   </>,
);
