// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { FaTrash, FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const { cart, removeFromCart, setCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [inputQty, setInputQty] = useState({});
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (!price) return 999999;
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Update total price when cart changes
  useEffect(() => {
    const total = cart.reduce((total, book) => {
      const bookPrice = book.price || 0;
      const qty = book.quantity || 1;
      return total + bookPrice * qty;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleQtyChange = (bookId, type, value = null) => {
    const updatedCart = cart.map((book) => {
      if (book.id === bookId) {
        const currentQty = book.quantity || 1;
        const newQty = value !== null
          ? parseInt(value) < 1 ? 1 : Math.min(999, parseInt(value))
          : type === "inc"
            ? currentQty + 1
            : type === "dec"
            ? Math.max(1, currentQty - 1)
            : currentQty;
  
        // Cập nhật inputQty ngay tại đây
        setInputQty((prev) => ({
          ...prev,
          [bookId]: newQty,
        }));
  
        return { ...book, quantity: newQty };
      }
      return book;
    });
  
    const total = updatedCart.reduce((total, book) => {
      const bookPrice = book.price || 0;
      const qty = book.quantity || 1;
      return total + bookPrice * qty;
    }, 0);
    setTotalPrice(total);
  
    setCart(updatedCart);
  };
  
  const handleCheckout = () => {
    const cartItems = cart.map(book => ({
      id: book.productId || book.id,
      productId: book.productId || book.id,
      name: book.title || "Không có tên",
      price: book.price || 999999,
      quantity: book.quantity || 1,
      image: book.imageUrl || "/placeholder-book.jpg"
    }));
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <>
      <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Trang chủ
              </Link>
              <FaAngleRight className="breadcrumb-sep" />
              <Link to="/products" className="breadcrumb-next">
                Sản phẩm
              </Link>
              <FaAngleRight className="breadcrumb-sep" />
              <span className="breadcrumb-current">Giỏ hàng</span>
            </div>
      <div className="cart-layout">
        <div className="cart cart-main">
          <h2>Giỏ hàng của bạn</h2>
          {cart.length === 0 ? (
            <p>Giỏ hàng của bạn hiện tại chưa có sản phẩm nào.</p>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Thông tin sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((book) => {
                    const price = book.price || 0;
                    const qty = book.quantity || 1;
                    return (
                      <tr key={book.productId || book.id} className="cart-row">
                        <td className="cart-product-info">
                          <Link to={`/book/${book.productId || book.id}`}>
                            <img
                              className="cart-img"
                              src={book.imageUrl || "/placeholder-book.jpg"}
                              alt={book.title || "Không có tên"}
                              onError={e => { e.target.src = "/placeholder-book.jpg"; }}
                            />
                          </Link>
                          <div className="cart-info-text">
                            <Link to={`/book/${book.productId || book.id}`} className="cart-title">
                              {book.title || "Không có tên"}
                            </Link>
                            <button
                              className="cart-remove"
                              onClick={() => removeFromCart(book.productId || book.id)}
                            >
                              <FaTrash size={20} color="#e53935" />
                            </button>
                          </div>
                        </td>
                        <td className="cart-price">
                          {formatPrice(price)}
                          <span className="cart-currency">₫</span>
                        </td>
                        <td className="cart-qty">{qty}</td>
                        <td className="cart-total">{formatPrice(price * qty)}₫</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="cart-summary">
                Tổng tiền: <span>{formatPrice(totalPrice)}₫</span>
              </div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>Thanh toán</button>
            </>
          )}
        </div>
        <div className="cart-sidebar">
          {/* Sidebar is now empty or you can remove this div entirely if not needed */}
        </div>
      </div>
    </>
  );
};

export default Cart;
