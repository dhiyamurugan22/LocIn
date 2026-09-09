package com.eduapp.templatecustomization.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SelectTemplateRequest {

    @NotBlank(message = "templateId is required")
    private String templateId;
}
