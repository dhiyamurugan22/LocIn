package com.eduapp.templatecustomization.service;

import com.eduapp.templatecustomization.dto.CustomizeTemplateRequest;
import com.eduapp.templatecustomization.dto.TemplateResponse;
import com.eduapp.templatecustomization.exception.TemplateNotFoundException;
import com.eduapp.templatecustomization.model.StudentTemplatePreference;
import com.eduapp.templatecustomization.model.Template;
import com.eduapp.templatecustomization.model.TemplateType;
import com.eduapp.templatecustomization.repository.StudentTemplatePreferenceRepository;
import com.eduapp.templatecustomization.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final StudentTemplatePreferenceRepository preferenceRepository;

    // ---------- Reads ----------

    public TemplateResponse getDefaultTemplate() {
        Template def = templateRepository.findFirstByType(TemplateType.DEFAULT)
                .orElseThrow(() -> new TemplateNotFoundException("Default template is not configured"));
        return TemplateResponse.from(def, false);
    }

    public List<TemplateResponse> getSuggestedTemplates() {
        return templateRepository.findByType(TemplateType.SUGGESTED).stream()
                .map(t -> TemplateResponse.from(t, false))
                .collect(Collectors.toList());
    }

    /** All templates available to a student: default + suggested gallery + their own custom templates. */
    public List<TemplateResponse> getTemplatesForStudent(String studentId) {
        String activeId = getActiveTemplateId(studentId);

        List<TemplateResponse> result = new java.util.ArrayList<>();
        templateRepository.findFirstByType(TemplateType.DEFAULT)
                .ifPresent(t -> result.add(TemplateResponse.from(t, t.getId().equals(activeId))));
        templateRepository.findByType(TemplateType.SUGGESTED)
                .forEach(t -> result.add(TemplateResponse.from(t, t.getId().equals(activeId))));
        templateRepository.findByOwnerStudentId(studentId)
                .forEach(t -> result.add(TemplateResponse.from(t, t.getId().equals(activeId))));
        return result;
    }

    public TemplateResponse getActiveTemplate(String studentId) {
        String activeId = getActiveTemplateId(studentId);
        Template active = templateRepository.findById(activeId)
                .orElseThrow(() -> new TemplateNotFoundException("Active template not found: " + activeId));
        return TemplateResponse.from(active, true);
    }

    // ---------- Writes ----------

    /** Select the default template, or a template from the suggested gallery, and make it active as-is. */
    public TemplateResponse selectTemplate(String studentId, String templateId) {
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new TemplateNotFoundException("Template not found: " + templateId));

        // Only DEFAULT, SUGGESTED, or the student's own CUSTOM templates can be selected.
        if (template.getType() == TemplateType.CUSTOM
                && !studentId.equals(template.getOwnerStudentId())) {
            throw new TemplateNotFoundException("Template not found: " + templateId);
        }

        setActiveTemplateId(studentId, template.getId());
        return TemplateResponse.from(template, true);
    }

    /**
     * Personalize a template: creates (or updates) the student's own CUSTOM
     * template with the given settings and makes it active. The base
     * default/suggested template is never modified — only the student's
     * personal copy is.
     */
    public TemplateResponse customizeTemplate(String studentId, CustomizeTemplateRequest request) {
        List<Template> existingCustoms = templateRepository.findByOwnerStudentId(studentId);

        Template custom = existingCustoms.stream().findFirst().orElseGet(() ->
                Template.builder()
                        .type(TemplateType.CUSTOM)
                        .ownerStudentId(studentId)
                        .build()
        );

        custom.setName(request.getName() != null && !request.getName().isBlank()
                ? request.getName() : "My Template");
        custom.setDescription("Personalized template");
        custom.setBasedOnTemplateId(request.getBasedOnTemplateId());
        custom.setSettings(request.getSettings());

        Template saved = templateRepository.save(custom);
        setActiveTemplateId(studentId, saved.getId());
        return TemplateResponse.from(saved, true);
    }

    /** Restore the student to the original system default template, discarding no data — their custom template stays saved but inactive. */
    public TemplateResponse restoreDefault(String studentId) {
        Template def = templateRepository.findFirstByType(TemplateType.DEFAULT)
                .orElseThrow(() -> new TemplateNotFoundException("Default template is not configured"));
        setActiveTemplateId(studentId, def.getId());
        return TemplateResponse.from(def, true);
    }

    // ---------- Helpers ----------

    private String getActiveTemplateId(String studentId) {
        return preferenceRepository.findByStudentId(studentId)
                .map(StudentTemplatePreference::getActiveTemplateId)
                .orElseGet(() -> {
                    // First-time student: default is active automatically.
                    Template def = templateRepository.findFirstByType(TemplateType.DEFAULT)
                            .orElseThrow(() -> new TemplateNotFoundException("Default template is not configured"));
                    return def.getId();
                });
    }

    private void setActiveTemplateId(String studentId, String templateId) {
        StudentTemplatePreference pref = preferenceRepository.findByStudentId(studentId)
                .orElseGet(() -> StudentTemplatePreference.builder().studentId(studentId).build());
        pref.setActiveTemplateId(templateId);
        preferenceRepository.save(pref);
    }
}
