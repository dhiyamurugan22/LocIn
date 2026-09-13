import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const isGeminiConfigured = Boolean(
  apiKey &&
  apiKey !== 'your_gemini_api_key_here' &&
  apiKey.length > 10
);

// Initialize Gemini Client
const ai = isGeminiConfigured ? new GoogleGenAI({ apiKey }) : null;

/**
 * Production AI Gateway powered by Google Gemini API
 */
export const aiService = {
  isLive() {
    return isGeminiConfigured;
  },

  /**
   * Ask Gemini a coding doubt or CS theory question
   */
  async askDoubt(question, context = '') {
    if (isGeminiConfigured && ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are the LockIn Academic AI Mentor — a patient, highly articulate computer science and engineering tutor.
Context: ${context || 'General Computer Science & Programming Study'}

Question: ${question}

Provide a clear, beautifully structured markdown answer with code snippets (if applicable), complexity analysis, and intuitive real-world analogies.`
                }
              ]
            }
          ]
        });

        if (response && response.text) {
          return {
            answer: response.text,
            timestamp: new Date().toISOString(),
            source: 'Gemini 2.5 Flash (Live LLM)'
          };
        }
      } catch (err) {
        console.warn('Gemini API request failed, switching to fallback engine:', err.message);
      }
    }

    // Smart Fallback Engine
    return {
      answer: this.generateSmartFallback(question),
      timestamp: new Date().toISOString(),
      source: 'LockIn Knowledge Engine (Offline Mode)'
    };
  },

  /**
   * Auto Summarize a student's study note into key takeaways
   */
  async summarizeNote(noteText) {
    if (isGeminiConfigured && ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Summarize the following study note into 3 concise bullet points and 2 key exam/interview takeaways:\n\n${noteText}`
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err) {
        console.warn('Gemini Note Summarizer fallback:', err.message);
      }
    }

    return `### Note Key Takeaways (Auto-Summary)\n- Core concepts captured from your handwritten & typed notes.\n- Key focus area: Review edge cases and asymptotic complexity.\n- Practice recommendation: Implement code solution without hints to solidify understanding.`;
  },

  /**
   * Generate interactive practice quiz questions for a topic
   */
  async generateQuiz(topic) {
    if (isGeminiConfigured && ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Generate 3 high-quality multiple choice questions about "${topic}" in valid JSON format.
Return ONLY a raw JSON array of objects with keys: id, question, options (array of 4 strings), answer (index 0-3), explanation.`
        });

        if (response && response.text) {
          const cleanJson = response.text.replace(/```json|```/g, '').trim();
          return JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn('Gemini Quiz Generator fallback:', err.message);
      }
    }

    // Default Fallback Practice Questions
    return [
      {
        id: 'q-fb-1',
        question: `What is the average time complexity of QuickSort on a randomly ordered array?`,
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
        answer: 1,
        explanation: 'QuickSort divides the array around a pivot. On average, it divides in half each step leading to O(N log N).'
      },
      {
        id: 'q-fb-2',
        question: `Which data structure provides O(1) average time complexity for key lookup and insertion?`,
        options: ['Binary Search Tree', 'Min-Heap', 'HashMap', 'LinkedList'],
        answer: 2,
        explanation: 'HashMaps use a hash function to map keys to bucket indices, yielding O(1) average performance.'
      }
    ];
  },

  generateSmartFallback(prompt) {
    const q = prompt.toLowerCase().trim();

    if (/^(hi+|hello+|hey+|yo|good morning)/i.test(q)) {
      return `Welcome! 👋 I am your **LockIn Academic AI Mentor**.\n\nI am here to help you bridge the gap between *fuzzy understanding* and *permanent code mastery*. You can ask me:\n- To explain algorithms, data structures, or system architecture\n- To generate and debug code (Java, C++, Python, JavaScript, Rust, SQL)\n- To summarize your study notes or practice interview problems!`;
    }

    if (q.includes('dijkstra') || q.includes('shortest path')) {
      return `### Dijkstra's Shortest Path Algorithm\n\n**Concept**: Dijkstra's algorithm finds the minimum distance from a single source node to all other nodes in a weighted graph with **non-negative weights**.\n\n#### Algorithm Blueprint:\n1. Maintain a distance array \`dist[]\` (set source to 0, all others to $\\infty$).\n2. Use a **Min-Priority Queue** to pick the unvisited node with the smallest tentative distance.\n3. Relax adjacent edges: if \`dist[u] + weight < dist[v]\`, update \`dist[v]\` and push to queue.\n\n\`\`\`cpp\n// Time Complexity: O((V + E) log V)\n// Auxiliary Space: O(V)\n\`\`\``;
    }

    return `### Answer for "${prompt}"\n\n1. **Core Concept**: Break down **${prompt}** into fundamental logic blocks.\n2. **Patience & Practice**: Work through the solution line by line until the pattern becomes second nature.\n3. **Tradeoffs**: Evaluate time complexity $O(N)$ vs space complexity $O(1)$.\n\nWould you like me to write a full code implementation or generate practice questions on this topic?`;
  }
};
