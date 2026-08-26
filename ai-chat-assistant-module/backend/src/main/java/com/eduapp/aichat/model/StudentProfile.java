package com.eduapp.aichat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "student_profiles")
public class StudentProfile {

    @Id
    private String studentId;

    /** e.g. "beginner", "intermediate", "advanced" */
    private String learningLevel;

    private String background;

    /**
     * Saved translation language (e.g. "ta", "hi", "en").
     * Once set here, the student does not need to pick it every time.
     */
    private String preferredLanguage;
}
