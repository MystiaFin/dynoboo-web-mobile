import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

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
import ProductDetails from "./pages/productdetails.tsx";

// Auth Context
import { AuthProvider } from "./context/AuthContext.tsx";

// Admin Imports
import AdminLayout from "./admin/layout.tsx";
import AdminDashboard from "./admin/pages/Dashboard.tsx";
import AdminProducts from "./admin/pages/AdminProducts.tsx";
import AdminOrders from "./admin/pages/Orders.tsx";
import AdminNewProduct from "./admin/pages/NewProduct.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors closeButton />{" "}
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
            <Route path="/product/:productid" element={<ProductDetails />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/new-product" element={<AdminNewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
