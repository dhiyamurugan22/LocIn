import React, { useState } from 'react';
import { Languages, Sparkles, Check } from 'lucide-react';

const TRANSLATION_MAP = {
  es: {
    "Data Structures & Algorithms": "Estructuras de Datos y Algoritmos",
    "Time & Space Complexity (Big-O)": "Complejidad de Tiempo y Espacio (Big-O)",
    "Binary Search": "Búsqueda Binaria",
    "Sorting Algorithms": "Algoritmos de Ordenación",
    "Graph Traversals": "Recorridos de Grafos",
    "Solve practice questions": "Resolver preguntas de práctica",
    "Welcome back": "Bienvenido de nuevo",
    "Algorithm Qualification Test": "Prueba de Calificación de Algoritmos",
  },
  fr: {
    "Data Structures & Algorithms": "Structures de Données et Algorithmes",
    "Time & Space Complexity (Big-O)": "Complexité Temporelle et Spatiale (Big-O)",
    "Binary Search": "Recherche Binaire",
    "Sorting Algorithms": "Algorithmes de Tri",
    "Graph Traversals": "Parcours de Graphes",
    "Solve practice questions": "Résoudre des questions d'entraînement",
    "Welcome back": "Bon retour",
    "Algorithm Qualification Test": "Test de Qualification d'Algorithmes",
  },
  de: {
    "Data Structures & Algorithms": "Datenstrukturen und Algorithmen",
    "Time & Space Complexity (Big-O)": "Zeit- und Speicherkomplexität (Big-O)",
    "Binary Search": "Binäre Suche",
    "Sorting Algorithms": "Sortieralgorithmen",
    "Graph Traversals": "Graphdurchläufe",
    "Solve practice questions": "Übungsfragen lösen",
    "Welcome back": "Willkommen zurück",
    "Algorithm Qualification Test": "Algorithmus-Qualifikationstest",
  },
  hi: {
    "Data Structures & Algorithms": "डेटा स्ट्रक्चर और एल्गोरिदम",
    "Time & Space Complexity (Big-O)": "समय और स्थान जटिलता (Big-O)",
    "Binary Search": "बाइनरी सर्च",
    "Sorting Algorithms": "सॉर्टिंग एल्गोरिदम",
    "Graph Traversals": "ग्राफ ट्रैवर्सल",
    "Solve practice questions": "अभ्यास प्रश्नों को हल करें",
    "Welcome back": "वापसी पर स्वागत है",
    "Algorithm Qualification Test": "एल्गोरिदम योग्यता परीक्षा",
  },
  ta: {
    "Data Structures & Algorithms": "தரவு கட்டமைப்புகள் & அல்காரிதம்கள்",
    "Time & Space Complexity (Big-O)": "நேர மற்றும் விண்வெளி சிக்கலானது (Big-O)",
    "Binary Search": "பைனரி தேடல்",
    "Sorting Algorithms": "வரிசையாக்க அல்காரிதம்கள்",
    "Graph Traversals": "வரைபட சுற்றுகள்",
    "Solve practice questions": "பயிற்சி கேள்விகளைத் தீர்க்கவும்",
    "Welcome back": "மீண்டும் வருக",
    "Algorithm Qualification Test": "அல்காரிதம் தகுதித் தேர்வு",
  }
};

export default function InlineTranslate({ text, children }) {
  const [translated, setTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const contentToTranslate = text || (typeof children === 'string' ? children : '');
  const targetLang = localStorage.getItem('locin_target_lang') || 'es';

  const handleToggle = () => {
    if (translated) {
      setTranslated(false);
      return;
    }

    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      setTranslated(true);
    }, 300);
  };

  const getTranslatedText = () => {
    const langMap = TRANSLATION_MAP[targetLang] || {};
    const exact = langMap[contentToTranslate.trim()];
    if (exact) return exact;
    return `[${targetLang.toUpperCase()}]: ${contentToTranslate}`;
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', position: 'relative' }}>
      <span>{translated ? getTranslatedText() : (children || text)}</span>
      <button
        type="button"
        onClick={handleToggle}
        title={`Translate in-place to ${targetLang.toUpperCase()}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.1rem 0.25rem',
          borderRadius: 'var(--radius-sm)',
          color: translated ? 'var(--accent-emerald)' : 'var(--text-muted)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Languages size={14} />
      </button>
    </span>
  );
}
