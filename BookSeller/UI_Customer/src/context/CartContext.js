// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Lấy thông tin người dùng

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Lấy user hiện tại
  const [cart, setCart] = useState([]);

  // Load giỏ hàng từ localStorage khi user thay đổi
  useEffect(() => {
    if (user && user.id) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]); // reset giỏ hàng nếu user chưa có
      }
    }
  }, [user]);

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Thêm sản phẩm
  const addToCart = (product) => {
    const normalizedProductId =
      product.productId || product.id || product.idProduct;

    if (!normalizedProductId) {
      console.warn("❌ Không thể thêm sản phẩm không có productId hợp lệ:", product);
    return;
  }

  const normalizedProduct = {
    ...product,
    productId: normalizedProductId, // Đảm bảo productId tồn tại
  };

  setCart((prevCart) => {
    const index = prevCart.findIndex(
      (item) => item.productId === normalizedProduct.productId
    );
    if (index !== -1) {
      const updated = [...prevCart];
      updated[index].quantity += normalizedProduct.quantity;
      return updated;
    } else {
      return [...prevCart, normalizedProduct];
    }
  });
};


  // Xóa sản phẩm
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
