// API Endpoints Constants
export const API_ENDPOINTS = {

  // 🔐 Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/update-profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // 👤 User
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    ORDERS: '/users/orders', // lịch sử mua hàng
  },

  // 🧋 Products (Menu)
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    BY_CATEGORY: '/products/category/:id',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
  },

  // 📂 Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: '/categories/:id',
  },

  // ⚙️ Options (size, topping)
  OPTIONS: {
    LIST: '/options',
    BY_PRODUCT: '/products/:id/options',
  },

  // 🛒 Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear',
  },

  // 🧾 Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    STATUS: '/orders/:id/status',
  },

  // 💳 Payments
  PAYMENTS: {
    CREATE: '/payments',
    VERIFY: '/payments/verify',
    METHODS: '/payments/methods',
  },

  // 🎁 Promotions
  PROMOTIONS: {
    LIST: '/promotions',
    APPLY: '/promotions/apply',
  },

  // ⭐ Reviews
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
    UPDATE: '/reviews/:id',
    DELETE: '/reviews/:id',
    BY_PRODUCT: '/products/:id/reviews',
  },

  // 🏪 Stores (chi nhánh)
  STORES: {
    LIST: '/stores',
    DETAIL: '/stores/:id',
    NEARBY: '/stores/nearby',
  },

  // 📰 Posts / Blog
  POSTS: {
    LIST: '/posts',
    DETAIL: '/posts/:id',
    BY_SLUG: '/posts/slug/:slug',
  },

  // 📦 Upload / General
  GENERAL: {
    CONTACT: '/contact',
    UPLOAD: '/upload',
  },

  // 🔥 ADMIN
  ADMIN: {

    USERS: {
      LIST: '/admin/users',
      DETAIL: '/admin/users/:id',
      CREATE: '/admin/users',
      UPDATE: '/admin/users/:id',
      DELETE: '/admin/users/:id',
    },

    PRODUCTS: {
      LIST: '/admin/products',
      CREATE: '/admin/products',
      UPDATE: '/admin/products/:id',
      DELETE: '/admin/products/:id',
    },

    CATEGORIES: {
      LIST: '/admin/categories',
      CREATE: '/admin/categories',
      UPDATE: '/admin/categories/:id',
      DELETE: '/admin/categories/:id',
    },

    OPTIONS: {
      LIST: '/admin/options',
      CREATE: '/admin/options',
      UPDATE: '/admin/options/:id',
      DELETE: '/admin/options/:id',
    },

    ORDERS: {
      LIST: '/admin/orders',
      DETAIL: '/admin/orders/:id',
      UPDATE_STATUS: '/admin/orders/:id/status',
    },

    PROMOTIONS: {
      LIST: '/admin/promotions',
      CREATE: '/admin/promotions',
      UPDATE: '/admin/promotions/:id',
      DELETE: '/admin/promotions/:id',
    },

    STORES: {
      LIST: '/admin/stores',
      CREATE: '/admin/stores',
      UPDATE: '/admin/stores/:id',
      DELETE: '/admin/stores/:id',
    },

    POSTS: {
      LIST: '/admin/posts',
      CREATE: '/admin/posts',
      UPDATE: '/admin/posts/:id',
      DELETE: '/admin/posts/:id',
    },

    REPORTS: {
      REVENUE: '/admin/reports/revenue',
      TOP_PRODUCTS: '/admin/reports/top-products',
    }
  }
}

// 🔧 Helper
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key])
  })
  return url
}

// Export
export const {
  AUTH,
  USER,
  PRODUCTS,
  CATEGORIES,
  OPTIONS,
  CART,
  ORDERS,
  PAYMENTS,
  PROMOTIONS,
  REVIEWS,
  STORES,
  POSTS,
  GENERAL,
  ADMIN,
} = API_ENDPOINTS