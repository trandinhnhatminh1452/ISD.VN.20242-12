import React from "react";

const Header = ({ currentPage }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Tổng quan";
      case "products":
        return "Quản lý sản phẩm";
      default:
        return "Tổng quan";
    }
  };

  return (
    <div className="bg-white shadow-sm p-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
      <div className="flex items-center space-x-4"></div>
    </div>
  );
};

export default Header;
