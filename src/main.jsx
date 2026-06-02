import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router"; // or 'react-router-dom'
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import HomeDetail from "./pages/HomeDetail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="/home/:id" element={<HomeDetail />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
