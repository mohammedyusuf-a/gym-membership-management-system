/**
 * TITAN IRON GYM - CLIENT API CONNECTOR
 * Connects frontend directly to Express + MongoDB backend
 */
(function() {
  const getApiBase = () => {
    // If frontend is served directly by Express backend on port 5000
    if (window.location.port === '5000' || window.location.pathname.startsWith('/api')) {
      return '/api';
    }
    // Default backend server address
    return 'http://localhost:5000/api';
  };

  const API_BASE = getApiBase();

  const request = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      config.signal = controller.signal;

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error ${response.status}`);
      }
      return data;
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('Connection timeout to MongoDB backend');
      }
      throw err;
    }
  };

  window.GymAPI = {
    baseUrl: API_BASE,

    // Live MongoDB Health Check
    async checkStatus() {
      return request('/status', { method: 'GET' });
    },

    // Fast One-Shot Synchronization
    async getInitialData() {
      return request('/init', { method: 'GET' });
    },

    // MEMBERS
    members: {
      async getAll() {
        return request('/members');
      },
      async getById(id) {
        return request(`/members/${id}`);
      },
      async create(memberData) {
        return request('/members', { method: 'POST', body: memberData });
      },
      async update(id, updatedFields) {
        return request(`/members/${id}`, { method: 'PUT', body: updatedFields });
      },
      async delete(id) {
        return request(`/members/${id}`, { method: 'DELETE' });
      },
      async renew(id, cycle = 'monthly', paymentMethod = 'UPI (Google Pay)') {
        return request(`/members/${id}/renew`, {
          method: 'POST',
          body: { cycle, paymentMethod }
        });
      },
      async applyPlan(memberId, planId, cycle = 'monthly', paymentMethod = 'UPI (Google Pay)', reference = '') {
        return request('/members/apply-plan', {
          method: 'POST',
          body: { memberId, planId, cycle, paymentMethod, reference }
        });
      }
    },

    // ATTENDANCE & TERMINAL CHECK-IN
    attendance: {
      async getAll() {
        return request('/attendance');
      },
      async checkIn(query) {
        return request('/attendance/checkin', {
          method: 'POST',
          body: { query }
        });
      }
    },

    // INVOICES & REVENUE
    invoices: {
      async getAll() {
        return request('/invoices');
      },
      async create(invoiceData) {
        return request('/invoices', {
          method: 'POST',
          body: invoiceData
        });
      }
    },

    // PRO SHOP & SUPPLEMENT PRODUCTS
    products: {
      async getAll() {
        return request('/products');
      },
      async purchase(productId, memberId, paymentMethod = 'UPI (Google Pay)', qty = 1) {
        return request('/products/purchase', {
          method: 'POST',
          body: { productId, memberId, paymentMethod, qty }
        });
      }
    },

    // PLANS
    plans: {
      async getAll() {
        return request('/plans');
      }
    },

    // TRAINERS
    trainers: {
      async getAll() {
        return request('/trainers');
      }
    },

    // CLASSES
    classes: {
      async getAll() {
        return request('/classes');
      }
    },

    // SETTINGS
    settings: {
      async get() {
        return request('/settings');
      },
      async update(settingData) {
        return request('/settings', {
          method: 'PUT',
          body: settingData
        });
      }
    },

    // AUTHENTICATION & USERS
    auth: {
      async login(email, password) {
        return request('/auth/login', {
          method: 'POST',
          body: { email, password }
        });
      },
      async register(name, email, phone, role, password) {
        return request('/auth/register', {
          method: 'POST',
          body: { name, email, phone, role, password }
        });
      },
      async getUsers() {
        return request('/auth/users');
      },
      async getProfile(emailOrId) {
        return request(`/auth/profile/${encodeURIComponent(emailOrId)}`);
      },
      async updateProfile(emailOrId, data) {
        return request(`/auth/profile/${encodeURIComponent(emailOrId)}`, {
          method: 'PUT',
          body: data
        });
      }
    },

    // SEED / RESET
    seed: {
      async resetDatabase() {
        return request('/seed', {
          method: 'POST',
          body: { force: true }
        });
      }
    }
  };
})();
