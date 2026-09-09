package com.learning.coursemodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * A student's relationship with one module: which teaching level they most
 * recently picked, every assessment attempt, and whether they've hit the
 * 80% mastery bar that unlocks the next module.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "student_module_progress")
@CompoundIndex(name = "student_module_idx", def = "{'studentId': 1, 'moduleId': 1}", unique = true)
public class StudentModuleProgress {

    @Id
    private String id;

    private String studentId;

    private String moduleId;

    /** The level chosen the most recent time this module was opened. Re-asked on every revisit. */
    private TeachingLevel selectedLevel;

    private List<AssessmentAttempt> attempts = new ArrayList<>();

    private boolean masteryAchieved;

    public Double bestScorePercent() {
        return attempts.stream().mapToDouble(AssessmentAttempt::getScorePercent).max().orElse(0.0);
    }
}
