import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import About from "./pages/about/about.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Support from "./pages/Support/support.jsx";
import OrderGuide from "./pages/Support/customer-support/order-guide.jsx";
import ShippingGuide from "./pages/Support/customer-support/shipping-guide.jsx";
import PaymentGuide from "./pages/Support/customer-support/payment-guide.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Payment from "./components/Payment/Payment.jsx";
import VietQR from "./components/Payment/VietQR.jsx";
import Transactions from "./pages/Transactions/Transactions.jsx";
import InvoiceDetail from "./pages/InvoiceDetail/InvoiceDetail.jsx";
import Layout from "./components/common/Layout.jsx";
import UpdateProfile from "./pages/Profile/updateProfile.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Routes>
              <Route
                path="/*"
                element={
                  <>
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
                      <Route path="/vietqr" element={<VietQR />} />
                      <Route path="/invoice/:id" element={<InvoiceDetail />} />
                      <Route path="/update-profile" element={<UpdateProfile />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />

              <Route path="/manage" element={<Layout />} />
            </Routes>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
