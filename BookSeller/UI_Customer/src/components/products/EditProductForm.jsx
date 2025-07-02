import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    title: product.name || "",
    category: product.type || "",
    description: product.description || "",
    barcode: product.barcode || "",
    value: product.priceBeforeVAT.replace("đ", "").replace(/,/g, "") || "",
    price: product.retailPrice.replace("đ", "").replace(/,/g, "") || "",
    quantity: product.quantity || "",
    entry_date: "",
    dimension: product.dimension || "",
    weight: product.weight || "",
    created_by: product.created_by || "",
  });

  useEffect(() => {
    let entryDateValue = "";
    if (product.lastUpdated && product.lastUpdated !== "N/A") {
      try {
        const [day, month, year] = product.lastUpdated.split("/");
        entryDateValue = new Date(`${year}-${month}-${day}`)
          .toISOString()
          .split("T")[0];
      } catch (e) {
        console.error("Lỗi parse ngày:", product.lastUpdated, e);
        entryDateValue = new Date().toISOString().split("T")[0];
      }
    } else {
      entryDateValue = new Date().toISOString().split("T")[0];
    }

    setFormData({
      title: product.name || "",
      category: product.type || "",
      description: product.description || "",
      barcode: product.barcode || "",
      value: product.priceBeforeVAT.replace("đ", "").replace(/,/g, "") || "",
      price: product.retailPrice.replace("đ", "").replace(/,/g, "") || "",
      quantity: product.quantity || "",
      entry_date: entryDateValue,
      dimension: product.dimension || "",
      weight: product.weight || "",
      created_by: product.created_by || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.barcode ||
      !formData.value ||
      !formData.price ||
      !formData.quantity
    ) {
      alert("Vui lòng điền tất cả các trường bắt buộc!");
      return;
    }

    try {
      const updatedProduct = {
        productId: product.id,
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim() || null,
        barcode: formData.barcode.trim(),
        value: formData.value,
        price: formData.price,
        quantity: parseInt(formData.quantity) || 0,
        entry_date: formData.entry_date || null,
        dimension: formData.dimension.trim() || null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        created_by: formData.created_by ? parseInt(formData.created_by) : null,
      };

      const oldPrice = parseFloat(
        product.retailPrice.replace("đ", "").replace(/,/g, "")
      );
      const newPrice = parseFloat(formData.price);
      let priceChange = null;
      if (!isNaN(oldPrice) && oldPrice !== newPrice) {
        const change =
          (((newPrice - oldPrice) / oldPrice) * 100).toFixed(1) + "%";
        const changeType = newPrice > oldPrice ? "positive" : "negative";
        priceChange = {
          name: product.name,
          oldPrice: product.retailPrice,
          newPrice: `${newPrice.toLocaleString()}đ`,
          change: `${changeType === "positive" ? "+" : ""}${change}`,
          changeType,
          timestamp: new Date().toISOString(),
        };
      }

      await axios.put(
        `http://localhost:8080/api/product/${product.id}`,
        updatedProduct,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (onProductUpdated) onProductUpdated(priceChange);
      alert("Sản phẩm đã được lưu thành công!");
      onClose();
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật sản phẩm:",
        error.response?.data || error.message
      );
      alert("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Sửa thông tin sản phẩm
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên sản phẩm *
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Loại sản phẩm *
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nhập barcode *
          </label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Giá nhập kho (VNĐ) *
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            step="0.01"
            required
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giá bán (VNĐ) *
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Số lượng *
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Ngày nhập kho
          </label>
          <input
            type="date"
            name="entry_date"
            value={formData.entry_date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kích thước (cm)
          </label>
          <input
            type="text"
            name="dimension"
            value={formData.dimension}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Khối lượng (g)
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Created by
          </label>
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

export default EditProductForm;
