import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import About from "./pages/about/about";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Contact from "./pages/Contact/contact";
import Support from "./pages/Support/support";
import OrderGuide from "./pages/Support/customer-support/order-guide";
import ShippingGuide from "./pages/Support/customer-support/shipping-guide";
import PaymentGuide from "./pages/Support/customer-support/payment-guide";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";
import Payment from "./components/Payment/Payment";
import Transactions from "./pages/Transactions/Transactions";
import InvoiceDetail from "./pages/InvoiceDetail/InvoiceDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:bookId" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/customer-support/order-guide" element={<OrderGuide />} />
              <Route path="/customer-support/shipping-guide" element={<ShippingGuide />} />
              <Route path="/customer-support/payment-guide" element={<PaymentGuide />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/invoice/:id" element={<InvoiceDetail />} />
            </Routes>
            <Footer />
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
