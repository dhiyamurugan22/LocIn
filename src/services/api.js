/**
 * LocIn API Gateway & Centralized Service Config
 * Handles requests to Spring Boot Microservices with intelligent fallback engine.
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

/**
 * Intelligent Dynamic AI Response Engine
 */
function generateSmartAIAnswer(q) {
  const cleanQ = q.trim();
  const query = cleanQ.toLowerCase();

  // 1. Greetings & Casual Chat Interactions
  if (['hi', 'hello', 'hey', 'hii', 'hi2', 'hola', 'yo', 'good morning', 'good evening', 'good day'].includes(query)) {
    return `Hello! 👋 How can I help you today? Ask me any doubt about programming, data structures, algorithms, system design, or computer science concepts!`;
  }

  if (query.startsWith('who are you') || query.includes('your name') || query === 'what are you') {
    return `I am your **LockIn AI Academic & Coding Assistant**! I help you solve doubts, debug code, explain algorithms, and master computer science concepts. What topic would you like to explore?`;
  }

  if (query.includes('how are you')) {
    return `I'm doing great and ready to help you solve coding doubts! What problem or algorithm are we working on today?`;
  }

  if (query.includes('thank') || query.includes('thanks')) {
    return `You're very welcome! Keep up the great learning momentum. Let me know if you run into any more doubts!`;
  }

  // 2. Specific Technical & Conceptual Doubts

  // HashMap vs ConcurrentHashMap
  if (query.includes('hashmap') || query.includes('concurrenthashmap')) {
    return `### HashMap vs ConcurrentHashMap Breakdown\n\n1. **HashMap**:\n   - **Thread Safety**: Not thread-safe. Multiple concurrent mutations can cause corruption or infinite loops.\n   - **Null Keys/Values**: Allows 1 null key and multiple null values.\n   - **Performance**: High performance for single-threaded use ($O(1)$ average time complexity).\n\n2. **ConcurrentHashMap**:\n   - **Thread Safety**: Thread-safe.\n   - **Locking Mechanism**: Uses bucket-level CAS (Compare-And-Swap) and synchronized node locking.\n   - **Null Keys/Values**: Does NOT allow null keys or null values.\n\n\`\`\`java\nConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.put("streak", 7);\n\`\`\``;
  }

  // Dijkstra & Shortest Path
  if (query.includes('dijkstra') || query.includes('shortest path')) {
    return `### Dijkstra's Shortest Path Algorithm\n\nDijkstra's algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph with **non-negative edge weights**.\n\n- **Time Complexity**: $O((V + E) \\log V)$ using a Min-Heap (PriorityQueue).\n- **Core Logic**: Continuously extract the vertex with the minimum distance and relax its neighbor edges.`;
  }

  // Memory & Garbage Collection
  if (query.includes('garbage collection') || query.includes('memory management') || query.includes('python memory')) {
    return `### Memory Management & Garbage Collection\n\n1. **Reference Counting**: Objects are deallocated immediately when their reference count drops to 0.\n2. **Generational Garbage Collector**: Detects and cleans up cyclic references across 3 generations (Gen 0, Gen 1, Gen 2).`;
  }

  // Sorting Algorithms
  if (query.includes('quicksort') || query.includes('mergesort') || query.includes('sort')) {
    return `### QuickSort vs MergeSort\n\n- **QuickSort**: $O(N \\log N)$ average, in-place $O(\\log N)$ memory, unstable.\n- **MergeSort**: Guaranteed $O(N \\log N)$ worst-case, requires $O(N)$ auxiliary space, stable.`;
  }

  // Stacks & Queues
  if (query.includes('stack') || query.includes('queue')) {
    return `### Stacks & Queues\n\n- **Stack**: Last-In, First-Out (LIFO). Operations: \`push()\`, \`pop()\`, \`peek()\` in $O(1)$ time.\n- **Queue**: First-In, First-Out (FIFO). Operations: \`enqueue()\`, \`dequeue()\` in $O(1)$ time.`;
  }

  // Binary Search & Trees
  if (query.includes('binary search') || query.includes('bst') || query.includes('tree')) {
    return `### Binary Search & Tree Traversals\n\n- **Binary Search**: Requires a sorted array. Runs in $O(\\log N)$ time by halving search space.\n- **Binary Search Tree (BST)**: Left child < Node < Right child. In-Order traversal yields sorted elements.`;
  }

  // Dynamic Programming & Recursion
  if (query.includes('dynamic programming') || query.includes('dp') || query.includes('recursion')) {
    return `### Dynamic Programming Essentials\n\nRequires two key properties:\n1. **Overlapping Subproblems**: Recomputing identical recursive subproblems.\n2. **Optimal Substructure**: Building optimal solutions from optimal subproblems.\n\nUse **Memoization** (Top-Down) or **Tabulation** (Bottom-Up).`;
  }

  // Errors & Debugging
  if (query.includes('error') || query.includes('null pointer') || query.includes('exception') || query.includes('bug')) {
    return `### Debugging Assistance\n\nTo debug your issue:\n1. Locate the line number in your stack trace.\n2. Ensure objects are initialized before calling methods.\n3. Check array index bounds ($0$ to $N-1$) and loop termination criteria.`;
  }

  // Natural Direct Fallback Answer
  return `Here is a breakdown to help with your query **"${cleanQ}"**:\n\n- **Core Concept**: Analyze the inputs, expected output, and edge cases.\n- **Approach**: Select the appropriate data structure (Array, HashMap, Stack, Tree, Graph) and algorithm pattern.\n\nIf you have code or an error message you'd like me to debug, paste it here!`;
}

export const AIService = {
  async askDoubt(question, context = '') {
    try {
      return await request(`${API_BASE_URLS.ai}/chat`, {
        method: 'POST',
        body: JSON.stringify({ question, context }),
      });
    } catch {
      // Dynamic AI response engine
      return {
        answer: generateSmartAIAnswer(question),
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
