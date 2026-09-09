package com.eduapp.templatecustomization.dto;

import com.eduapp.templatecustomization.model.Template;
import com.eduapp.templatecustomization.model.TemplateSettings;
import com.eduapp.templatecustomization.model.TemplateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateResponse {
    private String id;
    private String name;
    private String description;
    private String previewImageUrl;
    private TemplateType type;
    private TemplateSettings settings;
    private boolean active;

    public static TemplateResponse from(Template t, boolean active) {
        return TemplateResponse.builder()
                .id(t.getId())
                .name(t.getName())
                .description(t.getDescription())
                .previewImageUrl(t.getPreviewImageUrl())
                .type(t.getType())
                .settings(t.getSettings())
                .active(active)
                .build();
    }
}
