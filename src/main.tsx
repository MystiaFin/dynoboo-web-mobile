import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";

// Layout Imports
import HomeLayout from "./pages/layout.tsx";
import AuthLayout from "./pages/auth/layout.tsx";

// Page Imports
import Landing from "./pages/landing.tsx";
import Product from "./pages/product.tsx";
import SignIn from "./pages/auth/signin.tsx";
import SignUp from "./pages/auth/signup.tsx";
import Wishlist from "./pages/wishlist.tsx";
import Order from "./pages/order.tsx";

// Auth Context
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path="/landing" element={<Landing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/order" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
