package com.learning.coursemodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentAttempt {
    private double scorePercent;
    private boolean passed;
    private Instant submittedAt;
}
