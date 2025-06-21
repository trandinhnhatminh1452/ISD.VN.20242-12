import React from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';

const ProductFilters = ({ searchTerm, setSearchTerm, category, setCategory, onAddClick }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <button
          onClick={onAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm</span>
        </button>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc barcode..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Book">Book</option>
              <option value="CD">CD</option>
              <option value="LP">LP</option>
              <option value="DVD">DVD</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;