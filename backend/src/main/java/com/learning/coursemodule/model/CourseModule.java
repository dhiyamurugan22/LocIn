package com.learning.coursemodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * A single learning module inside a course. Every module carries the FULL
 * content set (easy/medium/hard) - the teaching level never gates access,
 * it only picks which of these three variants is shown.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "modules")
public class CourseModule {

    @Id
    private String id;

    private String courseId;

    private String title;

    /** 1-based position of this module within its course; used for sequencing/locking. */
    private int order;

    private Map<TeachingLevel, LevelContent> contentByLevel = new EnumMap<>(TeachingLevel.class);

    private List<AssessmentQuestion> assessmentQuestions;
}
