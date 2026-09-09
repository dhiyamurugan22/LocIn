package com.eduapp.templatecustomization.dto;

import com.eduapp.templatecustomization.model.TemplateSettings;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CustomizeTemplateRequest {

    /**
     * Optional name for the resulting personal template.
     * Defaults to "My Template" when not provided.
     */
    private String name;

    /**
     * The template the student is starting the customization from
     * (their current active template, a suggested one, or the default).
     * Optional — if omitted, the student's current active template is used as the base.
     */
    private String basedOnTemplateId;

    @NotNull(message = "settings is required")
    @Valid
    private TemplateSettings settings;
}
