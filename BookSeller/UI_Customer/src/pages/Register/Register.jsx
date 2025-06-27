// src/pages/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorText = await response.text();
        setError(errorText || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Tên tài khoản</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nhập tên tài khoản"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nhập email"
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Xác nhận mật khẩu"
            />
          </div>
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
        <div className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
