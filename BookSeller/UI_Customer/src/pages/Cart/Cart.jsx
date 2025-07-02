import React, { useEffect, useState } from "react";
import { FaTrash, FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Cart.scss";

const Cart = () => {
  const { cart, removeFromCart, increaseItem, decreaseItem } = useCart();
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [inputQty, setInputQty] = useState({});
  const navigate = useNavigate();

  const BASE_IMAGE_URL = "http://localhost:8080/image/";

  const formatPrice = (price) => {
    if (!price) return 0;
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const price = item.price || 0;
      const qty = item.quantity || 1;
      return sum + price * qty;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleQtyChange = (productId, type, value = null) => {
    if (type === "inc") {
      increaseItem(productId);
    } else if (type === "dec") {
      const item = cart.find((c) => c.productId === productId);
      if (item && item.quantity > 1) {
        decreaseItem(productId);
      }
    } else if (value !== null) {
      // Gọi API hoặc cập nhật quantity tùy logic bạn muốn
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để tiếp tục thanh toán.");
      navigate("/login");
      return;
    }

    const cartItems = cart.map((item) => ({
      id: item.productId,
      name: item.title,
      price: item.price || 0,
      quantity: item.quantity || 1,
      image: item.image,
    }));

    navigate("/payment", { state: { cartItems } });
  };

  if (!user) {
    return (
      <div className="cart-layout">
        <div className="cart cart-main">
          <h2>Giỏ hàng</h2>
          <p>
            Vui lòng{" "}
            <Link to="/login" className="login-link">
              đăng nhập
            </Link>{" "}
            để xem giỏ hàng của bạn.
          </p>
        </div>
      </div>
    );
  }

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
                  {cart.map((item) => {
                    const price = item.price || 0;
                    const qty = item.quantity || 1;

                    return (
                      <tr key={item.productId} className="cart-row">
                        <td className="cart-product-info">
                          <Link to={`/product/${item.productId}`}>
                            <img
                              className="cart-img"
                              src={`${BASE_IMAGE_URL}${item.image}`}
                              alt={item.title}
                              onError={(e) => {
                                e.target.src = "/default-book-cover.jpg";
                              }}
                            />
                          </Link>
                          <div className="cart-info-text">
                            <Link
                              to={`/product/${item.productId}`}
                              className="cart-title"
                            >
                              {item.title}
                            </Link>
                            <button
                              className="cart-remove"
                              onClick={() => removeFromCart(item.productId)}
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
                            <button onClick={() => handleQtyChange(item.productId, "dec")}>
                              -
                            </button>
                            <input
                              type="number"
                              value={
                                inputQty[item.productId] !== undefined
                                  ? inputQty[item.productId]
                                  : qty
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || /^[0-9]{0,3}$/.test(value)) {
                                  setInputQty((prev) => ({
                                    ...prev,
                                    [item.productId]: value,
                                  }));
                                }
                              }}
                              onBlur={(e) => {
                                const value = e.target.value;
                                if (value === "" || isNaN(value)) {
                                  setInputQty((prev) => {
                                    const updated = { ...prev };
                                    delete updated[item.productId];
                                    return updated;
                                  });
                                } else {
                                  handleQtyChange(item.productId, null, value);
                                }
                              }}
                              min="1"
                              max="999"
                            />
                            <button onClick={() => handleQtyChange(item.productId, "inc")}>
                              +
                            </button>
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
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Thanh toán
              </button>
            </>
          )}
        </div>
        <div className="cart-sidebar"></div>
      </div>
    </>
  );
};

export default Cart;
