/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/common/Header.jsx",
    "./src/components/common/Layout.jsx",
    "./src/components/common/Sidebar.jsx",
    "./src/components/dashboard/Dashboard.jsx",
    "./src/components/dashboard/OutOfStock.jsx",
    "./src/components/dashboard/PriceChanges.jsx",
    "./src/components/dashboard/StatsCard.jsx",
    "./src/components/products/ProductManagement.jsx",
    "./src/components/products/OrderApprovalList.jsx",
    "./src/components/products/AddProductForm.jsx",
    "./src/components/products/EditProductForm.jsx",
    "./src/components/products/OrderApprovalDetail.jsx",
    "./src/components/products/ProductFilter.jsx",
    "./src/components/products/ProductTable.jsx",
    "./src/components/constants/roles.js",
    "./src/components/data/sidebarData.js",
    "./src/components/hooks/useProductSelection.jsx",
    "./src/utils/helpers.js",

    
    
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
