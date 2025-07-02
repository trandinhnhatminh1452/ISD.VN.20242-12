import React, { useState, useEffect } from "react";
import ProductFilters from "./ProductFilter";
import ProductTable from "./ProductTable";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import axios from "axios";
import { useProductSelection } from "../../hooks/useProductSelection";
import { getColorByCategory } from "../../utils/helpers";

const ProductManagement = ({ onPriceChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/product");
      const mappedProducts = res.data.map((p) => {
        const price = p.price ?? 0;
        const retailPrice = price * 1.1;
        return {
          id: p.productId || p.id || Date.now() + Math.random(),
          name: p.title,
          type: p.category,
          priceBeforeVAT: `${price.toLocaleString()}đ`,
          retailPrice: `${retailPrice.toLocaleString()}đ`,
          quantity: p.quantity ?? 0,
          lastUpdated: p.entryDate
            ? new Date(p.entryDate).toLocaleDateString()
            : new Date().toLocaleDateString(),
          typeColor: getColorByCategory(p.category),
          description: p.description || "",
          barcode: p.barcode || "",
          dimension: p.dimension || "",
          weight: p.weight || "",
          created_by: p.created_by || "",
        };
      });
      setProducts(mappedProducts);
      console.log("Fetched products:", mappedProducts);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "";
    const matchesCategory = category === "" || product.type === category;
    return matchesSearch && matchesCategory;
  });

  const { selectAll, selectedProducts, handleSelectAll, handleSelectProduct } =
    useProductSelection(filteredProducts);

  const handleDeleteProduct = async (productId) => {
    if (!productId) {
      console.error("productId không hợp lệ:", productId);
      alert("ID sản phẩm không hợp lệ.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:8080/api/product/${productId}`);
        await fetchProducts();
        alert("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
      }
    }
  };

  const handleProductAdded = (newProduct) => {
    const price = newProduct.price ?? 0;
    const retailPrice = price * 1.1;

    setProducts([
      ...products,
      {
        id: newProduct.productId || Date.now() + Math.random(),
        name: newProduct.title,
        type: newProduct.category,
        priceBeforeVAT: `${price.toLocaleString()}đ`,
        retailPrice: `${retailPrice.toLocaleString()}đ`,
        quantity: newProduct.quantity ?? 0,
        lastUpdated: newProduct.entry_date
          ? new Date(newProduct.entry_date).toLocaleDateString()
          : new Date().toLocaleDateString(),
        typeColor: getColorByCategory(newProduct.category),
        description: newProduct.description || "",
        barcode: newProduct.barcode || "",
        dimension: newProduct.dimension || "",
        weight: newProduct.weight || "",
        created_by: newProduct.created_by || "",
      },
    ]);
    setShowAddForm(false);
  };

  const handleProductUpdated = async (priceChange) => {
    await fetchProducts();
    if (onPriceChange && priceChange) onPriceChange(priceChange);
    setShowEditForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        onAddClick={() => setShowAddForm(true)}
      />
      <ProductTable
        products={filteredProducts}
        selectAll={selectAll}
        selectedProducts={selectedProducts}
        handleSelectAll={handleSelectAll}
        handleSelectProduct={handleSelectProduct}
        handleDelete={handleDeleteProduct}
        onEdit={(product) => {
          console.log("Selected product for edit:", product);
          setSelectedProduct(product);
          setShowEditForm(true);
        }}
      />
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <AddProductForm
              onProductAdded={handleProductAdded}
              onClose={() => setShowAddForm(false)}
            />
            <button
              onClick={() => setShowAddForm(false)}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {showEditForm && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <EditProductForm
              key={selectedProduct.id}
              product={selectedProduct}
              onClose={() => setShowEditForm(false)}
              onProductUpdated={handleProductUpdated}
            />
            <button
              onClick={() => setShowEditForm(false)}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
