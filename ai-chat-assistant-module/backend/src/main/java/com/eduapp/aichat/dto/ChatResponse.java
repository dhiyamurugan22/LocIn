package com.eduapp.aichat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private String messageId;
    private String answer;          // final answer shown to student (translated if applicable)
    private String originalAnswer;  // English version, kept for reference
    private String languageUsed;
    private boolean translated;
}
