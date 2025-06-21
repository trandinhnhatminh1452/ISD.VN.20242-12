import React, { useState } from 'react';
  import axios from 'axios';

  const AddProductForm = ({ onProductAdded, onClose }) => {
    const [formData, setFormData] = useState({
      title: '',
      category: '',
      description: '',
      barcode: '',
      value: '',
      price: '',
      quantity: '',
      entry_date: '',
      dimension: '',
      weight: '',
      created_by: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.title || !formData.category || !formData.barcode || !formData.value || !formData.price || !formData.quantity) {
        alert('Vui lòng điền tất cả các trường bắt buộc!');
        return;
      }

      console.log('Dữ liệu gửi lên:', formData);
      try {
        const productData = {
          title: formData.title.trim(),
          category: formData.category.trim(),
          description: formData.description.trim() || null,
          barcode: formData.barcode.trim(),
          value: formData.value, // Gửi dưới dạng chuỗi để backend parse thành BigDecimal
          price: formData.price, // Gửi dưới dạng chuỗi
          quantity: parseInt(formData.quantity) || 0,
          entry_date: formData.entry_date, // Gửi dưới dạng "YYYY-MM-DD"
          dimension: formData.dimension.trim() || null,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          created_by: formData.created_by ? parseInt(formData.created_by) : null
        };

        const response = await axios.post('http://localhost:8080/api/products', productData, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Phản hồi từ server:', response.data);
        if (onProductAdded) onProductAdded(response.data);
        if (onClose) onClose();
        alert('Thêm sản phẩm thành công!');
      } catch (error) {
        console.error('Lỗi chi tiết khi thêm sản phẩm:', error.response?.data || error.message);
        alert('Không thể thêm sản phẩm. Vui lòng thử lại. Chi tiết: ' + (error.response?.data?.message || error.message));
      }
    };

    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm sản phẩm mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loại sản phẩm *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Chọn loại sản phẩm</option>
              <option value="Book">Book</option>
              <option value="CD">CD</option>
              <option value="LP">LP</option>
              <option value="DVD">DVD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nhập barcode *</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá nhập kho (VNĐ) *</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá bán (VNĐ) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số lượng *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày nhập kho</label>
            <input
              type="date"
              name="entry_date"
              value={formData.entry_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kích thước (cm)</label>
            <input
              type="text"
              name="dimension"
              value={formData.dimension}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Khối lượng (g)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created by</label>
            <input
              type="number"
              name="created_by"
              value={formData.created_by}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default AddProductForm;