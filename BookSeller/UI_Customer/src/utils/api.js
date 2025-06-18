// API service for connecting to backend
const API_BASE_URL = 'http://localhost:8080/api';

// Product API calls
export const productAPI = {
  // Get all products with pagination
  getAllProducts: async (page = 0, size = 12, search = '', category = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(search && { search }),
      ...(category && { category })
    });
    
    const response = await fetch(`${API_BASE_URL}/product/list?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  },

  // Get product details
  getProductDetails: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}/details`);
    if (!response.ok) {
      throw new Error('Product details not found');
    }
    return response.json();
  },

  // Search products
  searchProducts: async (query) => {
    const response = await fetch(`${API_BASE_URL}/product/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/product/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  },

  // Get related products
  getRelatedProducts: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}/related`);
    if (!response.ok) {
      throw new Error('Failed to fetch related products');
    }
    return response.json();
  }
};

// User API calls
export const userAPI = {
  // Register user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    return response.text();
  },

  // Login user (if you have login endpoint)
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    return response.json();
  }
};

// Cart API calls (if you have cart endpoints)
export const cartAPI = {
  // Get user cart
  getCart: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  },

  // Add item to cart
  addToCart: async (cartData) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    
    return response.json();
  },

  // Update cart item
  updateCartItem: async (cartItemData) => {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
    
    return response.json();
  },

  // Remove item from cart
  removeFromCart: async (cartId, productId) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartId, productId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    
    return response.json();
  }
};

// Order API calls (if you have order endpoints)
export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },

  // Get user orders
  getUserOrders: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/order/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy đơn hàng');
    return response.json();
  }
};

export const invoiceAPI = {
  createInvoice: async (data) => {
    const response = await fetch('http://localhost:8080/api/invoice/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Tạo hóa đơn thất bại');
    return response.json();
  },
  getInvoiceById: async (id) => {
    const response = await fetch(`http://localhost:8080/api/invoice/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy hóa đơn');
    return response.json();
  }
}; 