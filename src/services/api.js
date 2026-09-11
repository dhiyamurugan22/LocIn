/**
 * LocIn API Gateway & Centralized Service Config
 * Handles requests to Spring Boot Microservices with fallback mock support.
 */

const API_BASE_URLS = {
  user: '/api/user',
  ai: '/api/ai',
  algo: '/api/algo',
};

// Generic fetch wrapper
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('locin_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(endpoint, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const UserService = {
  async login(credentials) {
    try {
      return await request(`${API_BASE_URLS.user}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch {
      // Fallback local mock login
      const mockUser = {
        id: 1,
        name: credentials.username || 'Student User',
        email: credentials.email || 'student@locin.edu',
        token: 'mock-jwt-token-12345',
        streak: 7,
        xp: 1450,
      };
      localStorage.setItem('locin_user', JSON.stringify(mockUser));
      localStorage.setItem('locin_auth_token', mockUser.token);
      return mockUser;
    }
  },

  async getProfile() {
    const stored = localStorage.getItem('locin_user');
    return stored ? JSON.parse(stored) : { name: 'Student User', streak: 7, xp: 1450 };
  }
};

export const AIService = {
  async askDoubt(question, context = '') {
    try {
      return await request(`${API_BASE_URLS.ai}/chat`, {
        method: 'POST',
        body: JSON.stringify({ question, context }),
      });
    } catch {
      return {
        answer: `Here is a breakdown to solve your query regarding "${question}":\n\n1. **Core Concept**: Ensure you analyze the constraints and data types.\n2. **Strategy**: Break the problem down into sub-problems.\n3. **Optimization**: Check time complexity (O(N) vs O(N log N)).`,
        timestamp: new Date().toISOString(),
      };
    }
  }
};

export const AlgoService = {
  async getAlgorithms() {
    try {
      return await request(`${API_BASE_URLS.algo}/algorithms`);
    } catch {
      return [
        { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting', complexity: 'O(N^2)' },
        { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting', complexity: 'O(N log N)' },
        { id: 'binary-search', name: 'Binary Search', category: 'Searching', complexity: 'O(log N)' },
        { id: 'bfs', name: 'Breadth-First Search', category: 'Graphs', complexity: 'O(V + E)' },
      ];
    }
  }
};
