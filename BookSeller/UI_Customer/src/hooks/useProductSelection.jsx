import { useState } from 'react';

export const useProductSelection = (products) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return {
    selectAll,
    selectedProducts,
    handleSelectAll,
    handleSelectProduct
  };
};