import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

// Pages
import Page from "./shop/Page";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

// Context Providers
import { ShopProvider } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [search, setSearch] = useState("");

  return (
    <AuthProvider>
      <ShopProvider>
        <Navbar search={search} setSearch={setSearch} />

        <Routes>
          <Route
            path="/"
            element={
              <Page
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>

        <Footer />
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;