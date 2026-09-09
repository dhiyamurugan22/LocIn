package com.lms.algolearn.controller;

import com.lms.algolearn.dto.UpdatePreferenceRequest;
import com.lms.algolearn.model.Student;
import com.lms.algolearn.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.getById(id);
    }

    /**
     * PUT /api/students/{id}/preference
     * Body: { "preferredLevel": "MEDIUM" }
     * Can be called at any time - there is no restriction on switching
     * levels up, down, or back and forth.
     */
    @PutMapping("/{id}/preference")
    public Student updatePreference(@PathVariable String id, @Valid @RequestBody UpdatePreferenceRequest request) {
        return studentService.updatePreferredLevel(id, request.getPreferredLevel());
    }
}
