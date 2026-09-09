package com.learning.coursemodule.repository;

import com.learning.coursemodule.model.StudentModuleProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentModuleProgressRepository extends MongoRepository<StudentModuleProgress, String> {
    Optional<StudentModuleProgress> findByStudentIdAndModuleId(String studentId, String moduleId);
    List<StudentModuleProgress> findByStudentIdAndModuleIdIn(String studentId, List<String> moduleIds);
}
