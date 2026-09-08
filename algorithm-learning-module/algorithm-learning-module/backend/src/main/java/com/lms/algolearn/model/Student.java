package com.lms.algolearn.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Minimal student profile for this module.
 *
 * `preferredLevel` is the ONLY personalization field that affects
 * algorithm content, and it can be changed at any time - there is no
 * progression/unlock state stored here.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {

    @Id
    private String id;

    private String name;

    private String email;

    @Builder.Default
    private LearningLevel preferredLevel = LearningLevel.EASY;
}
