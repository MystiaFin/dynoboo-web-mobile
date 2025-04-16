import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";

// Layout Imports
import HomeLayout from "./pages/layout.tsx";

// Page Imports
import Landing from "./pages/landing.tsx";
import Product from "./pages/product.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<HomeLayout />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
