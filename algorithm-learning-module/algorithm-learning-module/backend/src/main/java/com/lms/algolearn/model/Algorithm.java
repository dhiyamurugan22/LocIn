package com.lms.algolearn.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

/**
 * A single algorithm, available in full to every student.
 *
 * `contentByLevel` holds one {@link LevelContent} per {@link LearningLevel}.
 * There is deliberately no "minLevel" or "unlockLevel" field anywhere in
 * this model - visibility of an algorithm never depends on level.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "algorithms")
public class Algorithm {

    @Id
    private String id;

    /** Short unique slug, e.g. "bubble-sort". Used in URLs. */
    @Indexed(unique = true)
    private String slug;

    /** Display name, e.g. "Bubble Sort". */
    private String name;

    /** Grouping only (for browsing/filtering) - not a gate. e.g. "Sorting", "Graph". */
    @Indexed
    private String category;

    /** One-line summary shown in the algorithm list. */
    private String summary;

    /** The three parallel explanations, keyed by level. */
    private Map<LearningLevel, LevelContent> contentByLevel;
}
