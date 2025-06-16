import React, { createContext, useContext, useState } from "react";

// Tạo context để quản lý giỏ hàng
const CartContext = createContext();

// Hook để sử dụng CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider để cung cấp giỏ hàng cho các component con
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Giỏ hàng (dùng useState để quản lý)

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBookIndex = prevCart.findIndex(
        (item) => item.productId === book.productId
      );

      if (existingBookIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingBookIndex] = {
          ...newCart[existingBookIndex],
          quantity: newCart[existingBookIndex].quantity + 1, // KHÔNG cần || 1 vì lúc thêm đã là 1 rồi
        };
        return newCart;
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((book) => book.productId !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
