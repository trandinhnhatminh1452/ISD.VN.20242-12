import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      cart: {
        cartId: userData.cartId,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData && typeof userData === "object") {
          if (!userData.cart && userData.cartId) {
            userData.cart = { cartId: userData.cartId };
          }
          setUser(userData);
        }
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
