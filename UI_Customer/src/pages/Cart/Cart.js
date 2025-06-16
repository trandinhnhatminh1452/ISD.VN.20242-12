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

  useEffect(() => {
    const total = cart.reduce((total, book) => {
      const bookPrice = book.price || 999999;
      const qty = book.quantity || 1;
      return total + bookPrice * qty;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleQtyChange = (productId, type, value = null) => {
    const updatedCart = cart.map((book) => {
      if (book.productId === productId) {
        const currentQty = book.quantity || 1;
        const newQty = value !== null
          ? Math.max(1, Math.min(999, parseInt(value)))
          : type === "inc"
          ? currentQty + 1
          : Math.max(1, currentQty - 1);

        return { ...book, quantity: newQty };
      }
      return book;
    });

    const total = updatedCart.reduce((total, book) => {
      const price = book.price || 999999;
      const qty = book.quantity || 1;
      return total + price * qty;
    }, 0);

    setTotalPrice(total);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    const cartItems = cart.map(book => ({
      id: book.id,
      name: book.title,
      price: book.price || 999999,
      quantity: book.quantity || 1,
      image: book.image
    }));
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <>
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Trang chủ</Link>
        <FaAngleRight className="breadcrumb-sep" />
        <Link to="/products" className="breadcrumb-next">Sản phẩm</Link>
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
                    const price = book.price || 999999;
                    const qty = book.quantity || 1;

                    return (
                      <tr key={book.id} className="cart-row">
                        <td className="cart-product-info">
                          <Link to={`/book/${book.id}`}>
                            {/* <img
                              className="cart-img"
                              src={image}
                              alt={book.title || "Sản phẩm"}
                              onError={(e) => {
                                e.target.src = '/default-book-cover.jpg';
                              }}
                            /> */}
                          </Link>
                          <div className="cart-info-text">
                            <Link to={`/book/${book.id}`} className="cart-title">
                              {book.title}
                            </Link>
                            <button
                              className="cart-remove"
                              onClick={() => removeFromCart(book.productId)}
                            >
                              <FaTrash size={20} color="#e53935" />
                            </button>
                          </div>
                        </td>
                        <td className="cart-price">
                          {formatPrice(price)}
                          <span className="cart-currency">₫</span>
                        </td>
                        <td>
                          <div className="cart-qty">
                            <button onClick={() => handleQtyChange(book.productId, "dec")}>-</button>
                            <input
                              type="number"
                              value={inputQty[book.productId] !== undefined ? inputQty[book.productId] : qty}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^[0-9]{0,3}$/.test(value)) {
                                  setInputQty((prev) => ({
                                    ...prev,
                                    [book.productId]: value,
                                  }));
                                }
                              }}
                              onBlur={(e) => {
                                const value = e.target.value;
                                if (value === "" || isNaN(value)) {
                                  setInputQty((prev) => {
                                    const updated = { ...prev };
                                    delete updated[book.productId];
                                    return updated;
                                  });
                                } else {
                                  handleQtyChange(book.productId, null, value);
                                }
                              }}
                              min="1"
                              max="999"
                            />
                            <button onClick={() => handleQtyChange(book.productId, "inc")}>+</button>
                          </div>
                        </td>
                        <td className="cart-total">
                          {formatPrice(price * qty)}
                          <span className="cart-currency">₫</span>
                        </td>
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
        <div className="cart-sidebar"></div>
      </div>
    </>
  );
};

export default Cart;
