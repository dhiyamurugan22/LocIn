package com.eduapp.aichat.controller;

import com.eduapp.aichat.model.StudentProfile;
import com.eduapp.aichat.repository.StudentProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    private final StudentProfileRepository studentProfileRepository;

    public SettingsController(StudentProfileRepository studentProfileRepository) {
        this.studentProfileRepository = studentProfileRepository;
    }

    /** ⚙️ Get the language currently saved in settings (or "English" default) */
    @GetMapping("/language/{studentId}")
    public Map<String, String> getLanguage(@PathVariable String studentId) {
        String language = studentProfileRepository.findById(studentId)
                .map(StudentProfile::getPreferredLanguage)
                .orElse("English");
        return Map.of("studentId", studentId, "preferredLanguage", language);
    }

    /** 🔁 Update the saved translation language anytime */
    @PutMapping("/language/{studentId}")
    public Map<String, String> updateLanguage(@PathVariable String studentId,
                                               @RequestBody Map<String, String> body) {
        String newLanguage = body.get("language");

        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElse(StudentProfile.builder()
                        .studentId(studentId)
                        .learningLevel("beginner")
                        .build());

        profile.setPreferredLanguage(newLanguage);
        studentProfileRepository.save(profile);

        return Map.of("studentId", studentId, "preferredLanguage", newLanguage);
    }
}
