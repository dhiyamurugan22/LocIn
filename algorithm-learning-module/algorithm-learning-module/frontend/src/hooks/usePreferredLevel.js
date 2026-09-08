import { useCallback, useEffect, useState } from "react";
import { updatePreferredLevel } from "../services/api";

const STORAGE_KEY = "algolearn.preferredLevel";
// Demo student id. In a real deployment this comes from the logged-in session.
const STUDENT_ID = process.env.REACT_APP_STUDENT_ID || null;

/**
 * The student's chosen explanation depth. Switching levels is always
 * allowed, in either direction, at any time - there is no progression
 * gate here, just a preference.
 */
export function usePreferredLevel() {
  const [level, setLevelState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "EASY"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, level);
  }, [level]);

  const setLevel = useCallback((newLevel) => {
    setLevelState(newLevel);
    if (STUDENT_ID) {
      updatePreferredLevel(STUDENT_ID, newLevel).catch(() => {
        // Non-fatal: the local preference still applies for this session.
      });
    }
  }, []);

  return [level, setLevel];
}
