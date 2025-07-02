import React from "react";
import { sidebarItems } from "../../data/sidebarData";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { logout } = useAuth();

  const handleItemClick = (item) => {
    if (item.action === "logout") {
      fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      }).finally(() => {
        logout();
      });
    } else if (item.page) {
      setCurrentPage(item.page);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Product Manager</h1>
      </div>
      <nav className="mt-6 block">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer relative ${
              item.active(currentPage)
                ? "bg-blue-50 border-r-4 border-blue-500 text-blue-600"
                : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <item.icon className="w-5 h-5 mr-3" />}
            <span className="font-medium">{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
