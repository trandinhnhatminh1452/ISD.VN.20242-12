import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import ProductManagement from '../products/ProductManagement';
import OrderApprovalList from '../products/OrderApprovalList';
import AccountInfo from '../AccountInfo/AccountInfo';
import UpdateAccount from '../AccountInfo/UpdateAccount';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setCurrentPage('updateAccount');
  };

  const handleCancelEdit = () => {
    setUserToEdit(null);
    setCurrentPage('accountInfo');
  };

  const handleUpdate = async (userId, formData) => {
    try {
      // 1. Cập nhật thông tin người dùng
      const updateRes = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
          email: formData.email, // thêm dòng này nếu cần cập nhật email
          password: "", // không đổi mật khẩu
        })
      });
  
      if (!updateRes.ok) {
        throw new Error("Cập nhật thông tin thất bại.");
      }
  
      // 2. Cập nhật vai trò nếu có thay đổi
      const selectedRole = formData.roles[0];
      const currentRoles = userToEdit.roles || [];
  
      const hasRoleChanged = !currentRoles.includes(selectedRole);
  
      if (selectedRole && hasRoleChanged) {
        const roleRes = await fetch(`http://localhost:8080/api/user/authorize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            id: userId,
            authority: selectedRole
          })
        });
  
        if (!roleRes.ok) {
          throw new Error("Cập nhật vai trò thất bại.");
        }
      }
  
      alert("Cập nhật thành công!");
      setUserToEdit(null);
      setCurrentPage("accountInfo");
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu: " + error.message);
    }
  };
  
  
  
  

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'productApproval':
        return <OrderApprovalList />;
      case 'accountInfo':
        return <AccountInfo onEditUser={handleEditUser} />;
      case 'updateAccount':
        return <UpdateAccount user={userToEdit} onClose={handleCancelEdit} onUpdate={handleUpdate} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-y-auto">
        <Header currentPage={currentPage} />
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;
