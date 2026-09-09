package com.learning.coursemodule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResultResponse {
    private double scorePercent;
    private boolean masteryAchieved;
    private double masteryThresholdPercent;
    private boolean nextModuleUnlocked;
    /** questionId -> whether that specific answer was correct, for review. */
    private Map<String, Boolean> perQuestionResult;
}
