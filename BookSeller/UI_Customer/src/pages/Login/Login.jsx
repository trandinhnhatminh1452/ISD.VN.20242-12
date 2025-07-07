import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending login request with:", {
        username: formData.username,
        password: formData.password,
      });

      const formBody = new URLSearchParams();
      formBody.append("username", formData.username);
      formBody.append("password", formData.password);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/login", true);
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onload = async function () {
        if (xhr.status === 200) {
          try {
            const res = await fetch("http://localhost:8080/api/user/me", {
              credentials: "include",
            });
            const userData = await res.json();

            if (res.ok) {
              localStorage.setItem("user", JSON.stringify(userData));
              login(userData);

              const roles = userData.roles || [];

              console.log("Đăng nhập với vai trò:", roles);
              if (
                roles.includes("ROLE_ADMIN") ||
                roles.includes("ROLE_MANAGER")
              ) {
                navigate("/manage");
              } else {
                navigate("/");
                window.location.reload();
              }
            } else {
              console.error("Không lấy được thông tin người dùng:", userData);
              setError("Không lấy được thông tin tài khoản");
            }
          } catch (err) {
            console.error("Lỗi khi lấy user:", err);
            setError("Lỗi khi lấy thông tin tài khoản");
          }
        } else if (xhr.status === 401) {
          setError("Sai tài khoản hoặc mật khẩu");
        } else {
          setError("Đăng nhập thất bại");
        }
      };

      xhr.onerror = function () {
        console.error("Network error:", xhr.status);
        setError("Lỗi kết nối đến server");
      };

      xhr.send(formBody.toString());
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setError("Lỗi kết nối đến server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <div className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
