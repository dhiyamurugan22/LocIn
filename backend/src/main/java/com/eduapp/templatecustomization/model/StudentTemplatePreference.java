package com.eduapp.templatecustomization.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * Tracks, per student, which template is currently active so the
 * frontend can restore it automatically whenever they log in.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "student_template_preferences")
public class StudentTemplatePreference {

    @Id
    private String id;

    @Indexed(unique = true)
    private String studentId;

    /** The Template currently active for this student (default, suggested, or their own custom one). */
    private String activeTemplateId;

    @LastModifiedDate
    private Instant updatedAt;
}
