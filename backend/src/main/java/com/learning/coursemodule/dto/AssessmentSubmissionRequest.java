package com.learning.coursemodule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentSubmissionRequest {
    private String studentId;

    /** questionId -> the student's typed answer */
    private Map<String, String> answers;
}
