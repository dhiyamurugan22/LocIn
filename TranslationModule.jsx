import React, { useState } from "react";
import { Languages, Check, Settings, ArrowLeft } from "lucide-react";
 
/**
 * Translation Module
 * --------------------------------------------------
 * Feature summary:
 * 1. Student sets a "Translation Language" once in Settings.
 * 2. That choice is saved as the default target language.
 * 3. Inside a lesson, selecting a sentence and tapping
 *    "Translate" instantly shows it in the saved language.
 * 4. Changing the language in Settings updates all future
 *    translations, without touching the lesson flow again.
 *
 * This component is a self-contained demo of that flow:
 * Settings screen <-> Lesson screen, sharing one language state.
 */
 
const LANGUAGES = [
  { code: "ta", label: "Tamil", flag: "🇮🇳" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "te", label: "Telugu", flag: "🇮🇳" },
  { code: "kn", label: "Kannada", flag: "🇮🇳" },
  { code: "ml", label: "Malayalam", flag: "🇮🇳" },
];
 
// Mock translations, keyed by language code, for the demo sentence.
const MOCK_TRANSLATIONS = {
  ta: "இந்த வாக்கியத்தை புரிந்துகொள்வது கடினமாக இருக்கலாம், ஆனால் பயிற்சியுடன் எளிதாகிவிடும்.",
  hi: "यह वाक्य समझने में कठिन लग सकता है, लेकिन अभ्यास से आसान हो जाएगा।",
  te: "ఈ వాక్యాన్ని అర్థం చేసుకోవడం కష్టంగా అనిపించవచ్చు, కానీ అభ్యాసంతో సులభం అవుతుంది.",
  kn: "ಈ ವಾಕ್ಯವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಕಷ್ಟವಾಗಬಹುದು, ಆದರೆ ಅಭ್ಯಾಸದಿಂದ ಸುಲಭವಾಗುತ್ತದೆ.",
  ml: "ഈ വാക്യം മനസ്സിലാക്കാൻ ബുദ്ധിമുട്ടായി തോന്നാം, പക്ഷേ പരിശീലനത്തിലൂടെ എളുപ്പമാകും.",
};
 
const LESSON_SENTENCE =
  "This sentence might feel hard to understand at first, but it gets easier with practice.";
 
export default function TranslationModule() {
  const [view, setView] = useState("lesson"); // "lesson" | "settings"
  const [targetLanguage, setTargetLanguage] = useState(null); // null until first-time setup
  const [selected, setSelected] = useState(false);
  const [translated, setTranslated] = useState(false);
 
  const currentLang = LANGUAGES.find((l) => l.code === targetLanguage);
 
  const handleSelectLanguage = (code) => {
    setTargetLanguage(code);
    setTranslated(false); // future translations use the new language
  };
 
  const handleTranslate = () => {
    if (!targetLanguage) {
      setView("settings");
      return;
    }
    setTranslated(true);
  };
 
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white">
        {view === "settings" ? (
          <button
            onClick={() => setView("lesson")}
            className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to lesson
          </button>
        ) : (
          <span className="text-sm font-medium text-slate-300">Lesson 4 · Sentence Structure</span>
        )}
        <button
          onClick={() => setView(view === "settings" ? "lesson" : "settings")}
          className="text-slate-300 hover:text-white transition-colors"
          aria-label="Open settings"
        >
          <Settings size={18} />
        </button>
      </div>
 
      {view === "settings" ? (
        <SettingsView
          languages={LANGUAGES}
          selectedCode={targetLanguage}
          onSelect={handleSelectLanguage}
        />
      ) : (
        <LessonView
          sentence={LESSON_SENTENCE}
          selected={selected}
          setSelected={setSelected}
          translated={translated}
          currentLang={currentLang}
          translation={targetLanguage ? MOCK_TRANSLATIONS[targetLanguage] : null}
          onTranslate={handleTranslate}
        />
      )}
    </div>
  );
}
 
function SettingsView({ languages, selectedCode, onSelect }) {
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Translation Language</h2>
      <p className="text-sm text-slate-500 mb-4">
        Sentences you translate in lessons will show up in this language.
      </p>
 
      <div className="space-y-2">
        {languages.map((lang) => {
          const isSelected = lang.code === selectedCode;
          return (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
              </span>
              {isSelected && <Check size={18} className="text-indigo-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
 
function LessonView({
  sentence,
  selected,
  setSelected,
  translated,
  currentLang,
  translation,
  onTranslate,
}) {
  return (
    <div className="p-5">
      <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Tap the sentence to select it
      </p>
 
      <button
        onClick={() => setSelected(!selected)}
        className={`w-full text-left px-4 py-3 rounded-xl border text-sm leading-relaxed transition-colors ${
          selected
            ? "border-indigo-500 bg-indigo-50 text-slate-900"
            : "border-slate-200 text-slate-700 hover:border-slate-300"
        }`}
      >
        {sentence}
      </button>
 
      {selected && (
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={onTranslate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Languages size={16} />
            Translate
          </button>
          {currentLang && (
            <span className="text-xs text-slate-400">
              Target: {currentLang.flag} {currentLang.label}
            </span>
          )}
        </div>
      )}
 
      {translated && translation && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-medium text-slate-500 mb-1">
            {currentLang.flag} {currentLang.label} translation
          </p>
          <p className="text-sm text-slate-800 leading-relaxed">{translation}</p>
        </div>
      )}
 
      {selected && !currentLang && (
        <p className="mt-3 text-xs text-amber-600">
          No translation language set yet — open Settings to choose one first.
        </p>
      )}
    </div>
  );
}
 