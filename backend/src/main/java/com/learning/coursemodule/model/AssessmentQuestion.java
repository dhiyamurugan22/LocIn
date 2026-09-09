package com.learning.coursemodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentQuestion {

    /** Stable id used to match a student's submitted answer back to this question. */
    private String questionId;

    /** The prompt, with a blank the student fills in, e.g. "A stack follows ___ order." */
    private String prompt;

    /** Any of these (case-insensitive, trimmed) counts as correct. */
    private List<String> acceptableAnswers;
}
