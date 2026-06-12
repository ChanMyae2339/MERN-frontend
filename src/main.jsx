import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigation from "./Navigation.jsx";
import Provider from "./Provider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Navigation />
    </Provider>
  </StrictMode>
);
