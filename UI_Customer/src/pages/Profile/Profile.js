import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.scss";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    console.log("User data:", user),
    (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Thông tin tài khoản</h1>
        </div>
        <div className="profile-content">
          <div className="profile-info">
            <h2>Thông tin cá nhân</h2>
            <div className="info-item">
              <span className="label">Tên tài khoản:</span>
              <span className="value">{user?.username}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Số điện thoại:</span>
              <span className="value">{user?.phone}</span>
            </div>
          </div>
          <div className="profile-actions">
            <button onClick={handleLogout} className="logout-button">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
