import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigation from "./Navigation.jsx";
import Provider from "./Provider.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Navigation />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
