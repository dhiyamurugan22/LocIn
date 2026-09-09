package com.eduapp.templatecustomization.controller;

import com.eduapp.templatecustomization.dto.CustomizeTemplateRequest;
import com.eduapp.templatecustomization.dto.SelectTemplateRequest;
import com.eduapp.templatecustomization.dto.TemplateResponse;
import com.eduapp.templatecustomization.service.TemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API for the Template Customization Module.
 *
 * Base path: /api/templates
 *
 *  GET  /default                          -> the single system default template
 *  GET  /suggested                        -> gallery of pre-designed templates
 *  GET  /student/{studentId}              -> all templates available to a student (default + suggested + their custom one), flagged with which is active
 *  GET  /student/{studentId}/active       -> the student's currently active template
 *  POST /student/{studentId}/select       -> activate the default template or a suggested/own-custom template as-is
 *  PUT  /student/{studentId}/customize    -> save personalization as the student's own template and activate it
 *  POST /student/{studentId}/restore-default -> switch the student back to the original default template
 */
@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping("/default")
    public ResponseEntity<TemplateResponse> getDefaultTemplate() {
        return ResponseEntity.ok(templateService.getDefaultTemplate());
    }

    @GetMapping("/suggested")
    public ResponseEntity<List<TemplateResponse>> getSuggestedTemplates() {
        return ResponseEntity.ok(templateService.getSuggestedTemplates());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<TemplateResponse>> getTemplatesForStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(templateService.getTemplatesForStudent(studentId));
    }

    @GetMapping("/student/{studentId}/active")
    public ResponseEntity<TemplateResponse> getActiveTemplate(@PathVariable String studentId) {
        return ResponseEntity.ok(templateService.getActiveTemplate(studentId));
    }

    @PostMapping("/student/{studentId}/select")
    public ResponseEntity<TemplateResponse> selectTemplate(
            @PathVariable String studentId,
            @Valid @RequestBody SelectTemplateRequest request) {
        return ResponseEntity.ok(templateService.selectTemplate(studentId, request.getTemplateId()));
    }

    @PutMapping("/student/{studentId}/customize")
    public ResponseEntity<TemplateResponse> customizeTemplate(
            @PathVariable String studentId,
            @Valid @RequestBody CustomizeTemplateRequest request) {
        return ResponseEntity.ok(templateService.customizeTemplate(studentId, request));
    }

    @PostMapping("/student/{studentId}/restore-default")
    public ResponseEntity<TemplateResponse> restoreDefault(@PathVariable String studentId) {
        return ResponseEntity.ok(templateService.restoreDefault(studentId));
    }
}
