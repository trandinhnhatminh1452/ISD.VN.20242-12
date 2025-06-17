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
          quantity: newCart[existingBookIndex].quantity + book.quantity,
        };
        return newCart;
      } else {
        return [...prevCart, { ...book }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((book) => book.productId !== productId)
    );
  };

  // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};