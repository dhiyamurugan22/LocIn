package com.eduapp.templatecustomization.repository;

import com.eduapp.templatecustomization.model.StudentTemplatePreference;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentTemplatePreferenceRepository extends MongoRepository<StudentTemplatePreference, String> {
    Optional<StudentTemplatePreference> findByStudentId(String studentId);
}
