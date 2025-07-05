import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './updateProfile.scss';

const UpdateProfile = () => {
  const { user,setUser } = useAuth();
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        username: formData.username,
        phone: formData.phone,
        password: formData.password || user.password, 
      };
  
      const res = await fetch(`http://localhost:8080/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
  
      if (res.ok) {
        const updatedUser = await res.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Cập nhật thành công!");
        navigate("/profile");
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Có lỗi xảy ra");
    }
  };
  

  return (
    <div className="update-profile-container">
      <h2>Cập nhật thông tin</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label>Tên tài khoản</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Số điện thoại</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>Mật khẩu mới</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateProfile;