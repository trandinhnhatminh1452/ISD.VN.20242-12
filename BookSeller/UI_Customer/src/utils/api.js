const API_BASE_URL = 'http://localhost:8080/api';

const normalizeProduct = (book) => {
  const productId = book.productId || book.id;
  if (!productId) return null;
  return {
    ...book,
    productId: productId,
  };
};

// Product API calls
export const productAPI = {
  getAllProducts: async (page = 0, size = 12, search = '', category = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(search && { search }),
      ...(category && { category }),
    });

    const response = await fetch(`${API_BASE_URL}/product/list?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    if (data?.content) {
      data.content = data.content
        .map(normalizeProduct)
        .filter((item) => item !== null);
    }
    return data;
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const book = await response.json();
    return normalizeProduct(book);
  },

  getProductDetails: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}/details`);
    if (!response.ok) throw new Error('Product details not found');
    const book = await response.json();
    return normalizeProduct(book);
  },

  searchProducts: async (query) => {
    const response = await fetch(`${API_BASE_URL}/product/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const books = await response.json();
    return books.map(normalizeProduct).filter(Boolean);
  },

  getProductsByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/product/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    const books = await response.json();
    return books.map(normalizeProduct).filter(Boolean);
  },

  getRelatedProducts: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}/related`);
    if (!response.ok) throw new Error('Failed to fetch related products');
    const books = await response.json();
    return books.map(normalizeProduct).filter(Boolean);
  }
};

// User API calls
export const userAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.text();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  addToCart: async (cartData) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartData),
    });
    if (!response.ok) throw new Error('Failed to add item to cart');
    return response.json();
  },

  updateCartItem: async (cartItemData) => {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItemData),
    });
    if (!response.ok) throw new Error('Failed to update cart item');
    return response.json();
  },

  removeFromCart: async (cartId, productId) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, productId }),
    });
    if (!response.ok) throw new Error('Failed to remove item from cart');
    return response.json();
  }
};

// Order API calls
export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  getUserOrders: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/order/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy đơn hàng');
    return response.json();
  },

  getTransactionHistory: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/order/transactions/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch transaction history');
    return response.json();
  },

  getAllTransactionsForTesting: async () => {
    const response = await fetch(`${API_BASE_URL}/order/transactions/all`);
    if (!response.ok) throw new Error('Failed to fetch all transactions for testing');
    return response.json();
  }
};

// Invoice API
export const invoiceAPI = {
  getInvoiceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/invoice/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy hóa đơn');
    return response.json();
  }
};
