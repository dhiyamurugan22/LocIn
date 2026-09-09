package com.eduapp.templatecustomization.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * A template definition.
 *
 * There is exactly one DEFAULT template (system-managed, not owned by a
 * student). SUGGESTED templates are a curated, system-managed gallery.
 * CUSTOM templates are student-owned personal templates.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "templates")
public class Template {

    @Id
    private String id;

    private String name;
    private String description;
    private String previewImageUrl;

    @Indexed
    private TemplateType type;

    /** Null for DEFAULT/SUGGESTED templates; set for CUSTOM templates. */
    @Indexed
    private String ownerStudentId;

    /** If this CUSTOM template was derived from a suggested/default one. */
    private String basedOnTemplateId;

    private TemplateSettings settings;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
