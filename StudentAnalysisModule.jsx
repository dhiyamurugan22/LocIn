import React, { useState } from "react";
import { ChevronDown, GraduationCap, BookOpen, Laptop2, Languages, BarChart3, Brain, Target } from "lucide-react";
 
/**
 * StudentAnalysisModule
 * ----------------------
 * A complete student profiling form covering:
 * 1. Educational Background
 * 2. Previously Studied Subjects
 * 3. Currently Studying
 * 4. Technical Knowledge
 * 5. Language Comfort
 * 6. Academic Performance
 * 7. Learning Style
 * 8. Learning Goal
 *
 * onChange(data) fires on every update with the full profile so a parent
 * component / backend integration can consume it.
 */
 
// ---------- Option constants ----------
 
const BACKGROUND_OPTIONS = [
  "Computer Science / Computer-related",
  "Biology",
  "Mathematics",
  "Commerce",
  "Arts / Humanities",
  "Other",
];
 
const SCHOOL_SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Social Science / History",
  "Commerce / Accountancy",
  "Economics",
  "Other",
];
 
const PROGRAMMING_LANGUAGES = [
  "Python",
  "Java",
  "C / C++",
  "JavaScript",
  "HTML/CSS",
  "SQL",
  "Scratch / Block-based",
  "None yet",
  "Other",
];
 
const KNOWLEDGE_LEVELS = [
  "Complete Beginner",
  "Basic (know a little)",
  "Intermediate (can build small things)",
  "Advanced (comfortable building projects)",
];
 
const LANGUAGES = ["English", "Tamil", "Hindi", "Other"];
 
const GRADE_RANGES = [
  "Below 50%",
  "50% - 60%",
  "60% - 70%",
  "70% - 80%",
  "80% - 90%",
  "90% and above",
  "Not sure / Prefer not to say",
];
 
const LEARNING_STYLES = [
  "Videos",
  "Reading",
  "Practical Exercises",
  "Examples",
  "Quizzes",
];
 
const LEARNING_GOALS = [
  "Programming",
  "Placement",
  "Exams",
  "New Skills",
  "Other",
];
 
// ---------- Reusable UI bits ----------
 
function Section({ icon: Icon, title, subtitle, isOpen, onToggle, children }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2.5 text-left">
          <Icon className="w-4.5 h-4.5 text-indigo-600 shrink-0" size={18} />
          <div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-4 py-4 space-y-4">{children}</div>}
    </div>
  );
}
 
function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        selected
          ? "bg-indigo-600 border-indigo-600 text-white"
          : "bg-white border-slate-300 text-slate-600 hover:border-indigo-400"
      }`}
    >
      {label}
    </button>
  );
}
 
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
 
const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
 
const toggleInArray = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
 
// ---------- Initial state ----------
 
const initialState = {
  // 1. Educational Background
  background: "",
  backgroundOther: "",
 
  // 2. Previously Studied Subjects
  schoolSubjects: [],
  schoolSubjectsOther: "",
  studiedCS: "", // Yes / No / Somewhat
  programmingExperience: "", // Yes / No
  programmingExperienceDetails: "",
 
  // 3. Currently Studying
  currentCourse: "",
  currentSubjects: "",
 
  // 4. Technical Knowledge
  knownLanguages: [],
  knownLanguagesOther: "",
  knowledgeLevel: "",
 
  // 5. Language Comfort
  languagesKnown: [],
  languagesKnownOther: "",
  preferredLearningLanguage: "",
 
  // 6. Academic Performance
  gradeRange: "",
  strongSubjects: "",
  weakSubjects: "",
 
  // 7. Learning Style
  learningStyles: [],
 
  // 8. Learning Goal
  learningGoals: [],
  learningGoalOther: "",
};
 
export default function StudentAnalysisModule({ onChange = () => {} }) {
  const [form, setForm] = useState(initialState);
  const [openSection, setOpenSection] = useState("background");
 
  const update = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    onChange(next);
  };
 
  const toggleArrayField = (field, value) => {
    update(field, toggleInArray(form[field], value));
  };
 
  const toggle = (key) =>
    setOpenSection((prev) => (prev === key ? "" : key));
 
  return (
    <section className="max-w-2xl mx-auto p-5 bg-slate-50 rounded-2xl">
      <header className="mb-5 px-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Student Analysis Module
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete profile — background, knowledge, language comfort, and
          goals.
        </p>
      </header>
 
      <div className="space-y-3">
        {/* 1. Educational Background */}
        <Section
          icon={GraduationCap}
          title="Educational Background"
          subtitle="What stream is the student from?"
          isOpen={openSection === "background"}
          onToggle={() => toggle("background")}
        >
          <Field label="Educational Background">
            <div className="flex flex-wrap gap-2">
              {BACKGROUND_OPTIONS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.background === opt}
                  onClick={() => update("background", opt)}
                />
              ))}
            </div>
            {form.background === "Other" && (
              <input
                type="text"
                placeholder="Specify background"
                className={`${inputClass} mt-2`}
                value={form.backgroundOther}
                onChange={(e) => update("backgroundOther", e.target.value)}
              />
            )}
          </Field>
        </Section>
 
        {/* 2. Previously Studied Subjects */}
        <Section
          icon={BookOpen}
          title="Previously Studied Subjects"
          subtitle="What did they study in school?"
          isOpen={openSection === "previous"}
          onToggle={() => toggle("previous")}
        >
          <Field label="Subjects studied in school (select all that apply)">
            <div className="flex flex-wrap gap-2">
              {SCHOOL_SUBJECT_OPTIONS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.schoolSubjects.includes(opt)}
                  onClick={() => toggleArrayField("schoolSubjects", opt)}
                />
              ))}
            </div>
            {form.schoolSubjects.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other subject(s)"
                className={`${inputClass} mt-2`}
                value={form.schoolSubjectsOther}
                onChange={(e) =>
                  update("schoolSubjectsOther", e.target.value)
                }
              />
            )}
          </Field>
 
          <Field label="Did they study Computer Science related subjects?">
            <div className="flex gap-2">
              {["Yes", "No", "Somewhat"].map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.studiedCS === opt}
                  onClick={() => update("studiedCS", opt)}
                />
              ))}
            </div>
          </Field>
 
          <Field label="Do they have any programming experience?">
            <div className="flex gap-2">
              {["Yes", "No"].map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.programmingExperience === opt}
                  onClick={() => update("programmingExperience", opt)}
                />
              ))}
            </div>
            {form.programmingExperience === "Yes" && (
              <input
                type="text"
                placeholder="Briefly describe experience (e.g. built a small app, college project)"
                className={`${inputClass} mt-2`}
                value={form.programmingExperienceDetails}
                onChange={(e) =>
                  update("programmingExperienceDetails", e.target.value)
                }
              />
            )}
          </Field>
        </Section>
 
        {/* 3. Currently Studying */}
        <Section
          icon={BookOpen}
          title="Currently Studying"
          subtitle="What are they studying currently?"
          isOpen={openSection === "current"}
          onToggle={() => toggle("current")}
        >
          <Field label="Current course / degree">
            <input
              type="text"
              placeholder="e.g. B.Sc Computer Science, 2nd year"
              className={inputClass}
              value={form.currentCourse}
              onChange={(e) => update("currentCourse", e.target.value)}
            />
          </Field>
          <Field label="Subjects currently studying">
            <input
              type="text"
              placeholder="e.g. Data Structures, DBMS, Operating Systems"
              className={inputClass}
              value={form.currentSubjects}
              onChange={(e) => update("currentSubjects", e.target.value)}
            />
          </Field>
        </Section>
 
        {/* 4. Technical Knowledge */}
        <Section
          icon={Laptop2}
          title="Technical Knowledge"
          subtitle="What do they know, and at what level?"
          isOpen={openSection === "technical"}
          onToggle={() => toggle("technical")}
        >
          <Field label="Programming languages already known">
            <div className="flex flex-wrap gap-2">
              {PROGRAMMING_LANGUAGES.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.knownLanguages.includes(opt)}
                  onClick={() => toggleArrayField("knownLanguages", opt)}
                />
              ))}
            </div>
            {form.knownLanguages.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other language(s)"
                className={`${inputClass} mt-2`}
                value={form.knownLanguagesOther}
                onChange={(e) =>
                  update("knownLanguagesOther", e.target.value)
                }
              />
            )}
          </Field>
 
          <Field label="Overall computer knowledge level">
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_LEVELS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.knowledgeLevel === opt}
                  onClick={() => update("knowledgeLevel", opt)}
                />
              ))}
            </div>
          </Field>
        </Section>
 
        {/* 5. Language Comfort */}
        <Section
          icon={Languages}
          title="Language Comfort"
          subtitle="Which language are they comfortable with?"
          isOpen={openSection === "language"}
          onToggle={() => toggle("language")}
        >
          <Field label="Languages known (select all that apply)">
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.languagesKnown.includes(opt)}
                  onClick={() => toggleArrayField("languagesKnown", opt)}
                />
              ))}
            </div>
            {form.languagesKnown.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other language(s)"
                className={`${inputClass} mt-2`}
                value={form.languagesKnownOther}
                onChange={(e) =>
                  update("languagesKnownOther", e.target.value)
                }
              />
            )}
          </Field>
 
          <Field label="Preferred language to learn in">
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.filter((l) => l !== "Other").map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.preferredLearningLanguage === opt}
                  onClick={() => update("preferredLearningLanguage", opt)}
                />
              ))}
            </div>
          </Field>
        </Section>
 
        {/* 6. Academic Performance */}
        <Section
          icon={BarChart3}
          title="Academic Performance"
          subtitle="Marks range, strong & weak subjects"
          isOpen={openSection === "performance"}
          onToggle={() => toggle("performance")}
        >
          <Field label="Usual marks / grade range">
            <div className="flex flex-wrap gap-2">
              {GRADE_RANGES.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.gradeRange === opt}
                  onClick={() => update("gradeRange", opt)}
                />
              ))}
            </div>
          </Field>
          <Field label="Strong subjects">
            <input
              type="text"
              placeholder="e.g. Mathematics, Computer Science"
              className={inputClass}
              value={form.strongSubjects}
              onChange={(e) => update("strongSubjects", e.target.value)}
            />
          </Field>
          <Field label="Weak subjects">
            <input
              type="text"
              placeholder="e.g. English, Chemistry"
              className={inputClass}
              value={form.weakSubjects}
              onChange={(e) => update("weakSubjects", e.target.value)}
            />
          </Field>
        </Section>
 
        {/* 7. Learning Style */}
        <Section
          icon={Brain}
          title="Learning Style"
          subtitle="How do they understand things best?"
          isOpen={openSection === "style"}
          onToggle={() => toggle("style")}
        >
          <Field label="Preferred learning styles (select all that apply)">
            <div className="flex flex-wrap gap-2">
              {LEARNING_STYLES.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.learningStyles.includes(opt)}
                  onClick={() => toggleArrayField("learningStyles", opt)}
                />
              ))}
            </div>
          </Field>
        </Section>
 
        {/* 8. Learning Goal */}
        <Section
          icon={Target}
          title="Learning Goal"
          subtitle="What are they studying for?"
          isOpen={openSection === "goal"}
          onToggle={() => toggle("goal")}
        >
          <Field label="Goals (select all that apply)">
            <div className="flex flex-wrap gap-2">
              {LEARNING_GOALS.map((opt) => (
                <Chip
                  key={opt}
                  label={opt}
                  selected={form.learningGoals.includes(opt)}
                  onClick={() => toggleArrayField("learningGoals", opt)}
                />
              ))}
            </div>
            {form.learningGoals.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other goal"
                className={`${inputClass} mt-2`}
                value={form.learningGoalOther}
                onChange={(e) => update("learningGoalOther", e.target.value)}
              />
            )}
          </Field>
        </Section>
      </div>
    </section>
  );
}
 