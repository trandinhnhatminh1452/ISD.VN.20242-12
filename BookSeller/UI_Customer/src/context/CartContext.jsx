// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.cart?.cartId) {
        try {
          const res = await axios.get(`/api/cartitem/${user.cart.cartId}`);
          setCart(res.data);
        } catch (err) {
          console.error("Lỗi khi tải giỏ hàng:", err);
        }
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [user]);

  //  Thêm sản phẩm
  const addToCart = async (product) => {
    try {
      const productId = product.productId || product.id || product.idProduct;
      const quantity = product.quantity || 1;

      console.log("Sending to API:", {
        product_id: productId,
        cart_id: user?.cart?.cartId,
        quantity,
      });


      await axios.post("/api/cartitem/cartitem", {
        product_id: productId,
        cart_id: user.cart.cartId,
        quantity,
      });

      // Reload lại cart
      const res = await axios.get(`/api/cartitem/${user.cart.cartId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  //  Xóa sản phẩm
  const removeFromCart = async (productId) => {
    try {
      await axios.post("/api/cartitem/cartitem1", {
        product_id: productId,
        cart_id: user.cart.cartId,
      });
      const res = await axios.get(`/api/cartitem/${user.cart.cartId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  //  Giảm số lượng
  const decreaseItem = async (productId) => {
    try {
      await axios.post("/api/cartitem/cartitem2", {
        product_id: productId,
        cart_id: user.cart.cartId,
      });
      const res = await axios.get(`/api/cartitem/${user.cart.cartId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };

  //  Tăng số lượng
  const increaseItem = async (productId) => {
    try {
      await axios.post("/api/cartitem/cartitem3", {
        product_id: productId,
        cart_id: user.cart.cartId,
      });
      const res = await axios.get(`/api/cartitem/${user.cart.cartId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }

  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        decreaseItem,
        increaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
