package com.lms.algolearn.model;

/**
 * A student's PREFERRED explanation depth.
 *
 * IMPORTANT: this is not a difficulty gate. It never determines which
 * algorithms a student can see - only how deeply the same algorithm
 * is explained to them. A student can switch levels at any time and
 * immediately see every algorithm re-explained at the new depth.
 */
public enum LearningLevel {
    EASY,
    MEDIUM,
    HARD
}
