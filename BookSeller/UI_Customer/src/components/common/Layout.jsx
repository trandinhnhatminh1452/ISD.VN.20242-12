import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import ProductManagement from '../products/ProductManagement';
import OrderApprovalList from '../products/OrderApprovalList';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'productApproval':
        return <OrderApprovalList />;
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