package com.eduapp.aichat.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SimplifyRequest {

    @NotBlank
    private String studentId;

    @NotBlank
    private String messageId;
}
