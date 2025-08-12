import { StrictMode } from "react";
import App from "./routes/Home.jsx";
import "./styles/index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";

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
         <Provider store={store}>
            <RouterProvider router={router} />
         </Provider>
      </StrictMode>
   </>,
);
