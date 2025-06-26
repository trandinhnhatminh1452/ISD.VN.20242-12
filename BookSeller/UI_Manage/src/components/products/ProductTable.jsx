import React from 'react';
import { getTypeColorClass } from '../../utils/helpers';

const ProductTable = ({ products, selectAll, selectedProducts, handleSelectAll, handleSelectProduct, handleDelete, onEdit }) => {
  const handleDeleteClick = (productId, product) => {
    console.log(`Xóa sản phẩm với productId: ${productId}, Product:`, product);
    if (handleDelete) {
      handleDelete(productId);
    } else {
      console.error('handleDelete không được truyền vào ProductTable');
    }
  };

  const handleEditClick = (product) => {
    console.log('Sửa sản phẩm:', product); // Debug log cho từng sản phẩm
    if (onEdit) {
      onEdit(product);
    } else {
      console.error('onEdit không được truyền vào ProductTable');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Danh sách sản phẩm</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STT</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Tên SP</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Loại</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Giá (trước VAT)</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Giá trị</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Số lượng</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Cập nhật giá lần cuối</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-4 px-4 text-gray-900">{index + 1}</td>
                <td className="py-4 px-4 text-gray-900 font-medium">{product.name}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColorClass(product.typeColor)}`}>
                    {product.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-900">{product.priceBeforeVAT}</td>
                <td className="py-4 px-4 text-gray-900">{product.retailPrice}</td>
                <td className="py-4 px-4 text-gray-900">{product.quantity}</td>
                <td className="py-4 px-4 text-gray-600">{product.lastUpdated}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                      onClick={() => handleEditClick(product)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 text-sm font-medium px-3 py-1 rounded transition-colors"
                      onClick={() => handleDeleteClick(product.id, product)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;