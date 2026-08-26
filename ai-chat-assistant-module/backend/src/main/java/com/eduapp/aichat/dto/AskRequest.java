package com.eduapp.aichat.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AskRequest {

    @NotBlank
    private String studentId;

    private String courseId;

    @NotBlank
    private String question;

    /**
     * Optional. If not provided, the backend falls back to the student's
     * saved preferredLanguage from settings — no need to send it every time.
     */
    private String languageOverride;
}
