package com.lms.algolearn.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * One algorithm's explanation at a single {@link LearningLevel}.
 *
 * Fields are intentionally optional-by-level:
 *  - EASY   : explanation + example + steps
 *  - MEDIUM : + workingPrinciple + pseudocode + complexity
 *  - HARD   : + implementationNotes + edgeCases + optimizations + complexity (detailed)
 *
 * The frontend renders only the sections that are populated, so lower
 * levels naturally look simpler without any content being hidden -
 * it just was never written at that depth.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LevelContent {

    /** Plain-language explanation of what the algorithm does and why. */
    private String explanation;

    /** A concrete, worked example (numbers/data walked through by hand). */
    private String example;

    /** Ordered, simple steps - always present, depth of wording varies by level. */
    private List<String> steps;

    /** Medium/Hard: how the algorithm actually works internally. */
    private String workingPrinciple;

    /** Medium/Hard: language-agnostic pseudocode. */
    private String pseudocode;

    /** Medium/Hard: time/space complexity, best/average/worst as applicable. */
    private String complexity;

    /** Hard only: real implementation considerations (data structures, language quirks). */
    private String implementationNotes;

    /** Hard only: tricky/edge cases and how the algorithm handles them. */
    private List<String> edgeCases;

    /** Hard only: known optimizations and their trade-offs. */
    private List<String> optimizations;
}
