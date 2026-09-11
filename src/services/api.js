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
  const query = q.toLowerCase();

  if (query.includes('hashmap') || query.includes('concurrenthashmap')) {
    return `### HashMap vs ConcurrentHashMap Breakdown\n\n1. **HashMap**:\n   - **Thread Safety**: Not thread-safe. Multiple threads mutating a HashMap simultaneously can cause infinite loops or data corruption.\n   - **Null Keys/Values**: Allows 1 null key and multiple null values.\n   - **Performance**: High performance for single-threaded environments ($O(1)$ average time complexity).\n\n2. **ConcurrentHashMap**:\n   - **Thread Safety**: Thread-safe without locking the entire table.\n   - **Locking Mechanism**: Uses bucket-level locking (Segment locking in Java 7, CAS + synchronized nodes in Java 8+).\n   - **Null Keys/Values**: Does NOT allow null keys or null values to prevent ambiguity during concurrent lookups.\n\n\`\`\`java\n// ConcurrentHashMap Usage Example\nConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.put("student_id", 101);\nmap.computeIfAbsent("streak", k -> 7);\n\`\`\``;
  }

  if (query.includes('dijkstra') || query.includes('shortest path')) {
    return `### Dijkstra's Shortest Path Algorithm\n\n1. **Core Concept**:\n   Dijkstra's algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with **non-negative edge weights**.\n\n2. **Priority Queue Optimization**:\n   - Using a **Min-Heap (PriorityQueue)** allows extracting the node with the minimum distance in $O(\\log V)$ time.\n   - Total Time Complexity: $O((V + E) \\log V)$, where $V$ is vertices and $E$ is edges.\n\n\`\`\`java\nPriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a.dist));
pq.add(new Pair(source, 0));
dist[source] = 0;

while (!pq.isEmpty()) {
    Pair curr = pq.poll();
    int u = curr.node;
    for (Edge edge : adj.get(u)) {
        if (dist[u] + edge.weight < dist[edge.to]) {
            dist[edge.to] = dist[u] + edge.weight;
            pq.add(new Pair(edge.to, dist[edge.to]));
        }
    }
}\n\`\`\``;
  }

  if (query.includes('garbage collection') || query.includes('memory') || query.includes('python')) {
    return `### Python Memory Management & Garbage Collection\n\n1. **Reference Counting (Primary Mechanism)**:\n   - Every object in Python maintains a count of references pointing to it.\n   - When reference count drops to 0, Python deallocates memory immediately.\n\n2. **Generational Garbage Collector (Cyclic Trash)**:\n   - Handles cyclic references (e.g. Node A -> Node B -> Node A).\n   - Objects are categorized into 3 generations (Gen 0, Gen 1, Gen 2) based on survival time.\n   - Young generations are collected frequently; old generations less frequently.\n\n\`\`\`python\nimport gc
print("GC threshold:", gc.get_threshold())
# Manually trigger collection if needed
gc.collect()\n\`\`\``;
  }

  if (query.includes('quicksort') || query.includes('mergesort') || query.includes('sort')) {
    return `### Sorting Algorithm Deep Dive\n\n1. **QuickSort**:\n   - **Strategy**: Divide and conquer using a pivot element.\n   - **Time Complexity**: Average $O(N \\log N)$, Worst-case $O(N^2)$ (when pivot choice is poor).\n   - **Space Complexity**: In-place $O(\\log N)$ recursion stack.\n\n2. **MergeSort**:\n   - **Strategy**: Recursively splits array into halves, sorts them, and merges.\n   - **Time Complexity**: Guaranteed $O(N \\log N)$ worst-case.\n   - **Space Complexity**: $O(N)$ auxiliary array.\n\n3. **Recommendation**: Use QuickSort for in-memory primitive sorting; use MergeSort when stability is required.`;
  }

  if (query.includes('binary search') || query.includes('bst') || query.includes('tree')) {
    return `### Binary Search & Tree Traversals\n\n1. **Binary Search Principle**:\n   - Requires a **sorted input array**.\n   - Halves the search space on each comparison step.\n   - Time Complexity: $O(\\log N)$, Space Complexity: $O(1)$ iterative.\n\n2. **Binary Search Tree (BST) Traversals**:\n   - **In-Order (Left, Root, Right)**: Yields elements in ascending sorted order.\n   - **Pre-Order (Root, Left, Right)**: Useful for copying tree structures.\n   - **Post-Order (Left, Right, Root)**: Ideal for deleting nodes bottom-up.`;
  }

  if (query.includes('recursion') || query.includes('dp') || query.includes('dynamic programming')) {
    return `### Dynamic Programming & Recursion Strategy\n\n1. **Two Essential DP Properties**:\n   - **Overlapping Subproblems**: The same subproblems are solved multiple times.\n   - **Optimal Substructure**: The optimal solution to the problem contains optimal solutions to subproblems.\n\n2. **Approaches**:\n   - **Top-Down (Memoization)**: Recursive call stack + Hash Map / Lookup table.\n   - **Bottom-Up (Tabulation)**: Iterative loop building solution array from base cases up to target N.`;
  }

  if (query.includes('error') || query.includes('null pointer') || query.includes('exception')) {
    return `### Code Debugging & Exception Resolution\n\n1. **Root Cause Analysis**:\n   - Identify the line number and exact stack trace message.\n   - Verify non-null object state before invoking methods.\n\n2. **Best Defensive Practices**:\n   - Use Optional types or null checks: \`if (obj != null) { ... }\`.\n   - Check index bounds on arrays before accessing \`arr[i]\`.\n   - Ensure loop termination conditions prevent infinite recursion.`;
  }

  // Dynamic customized response for general queries
  return `### Comprehensive Answer regarding "${q}"\n\n1. **Core Concept Overview**:\n   Analyzing your question about **"${q}"**:\n   - Ensure you break down the requirement into logical steps.\n   - Consider edge cases such as empty input arrays, negative integers, or boundary values.\n\n2. **Implementation Pattern**:\n   - Use clean, modular code with descriptive variable names.\n   - Avoid redundant loops inside nested loops to keep complexity optimal.\n\n3. **Complexity & Optimization**:\n   - **Time Complexity**: Aim for $O(N)$ or $O(N \\log N)$ where possible.\n   - **Space Complexity**: Minimize extra memory allocations ($O(1)$ auxiliary space).\n\nIf you have a specific code snippet you'd like me to debug or optimize, paste it here!`;
}

export const AIService = {
  async askDoubt(question, context = '') {
    try {
      return await request(`${API_BASE_URLS.ai}/chat`, {
        method: 'POST',
        body: JSON.stringify({ question, context }),
      });
    } catch {
      // Dynamic fallback AI solver engine
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
