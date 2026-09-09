package com.learning.coursemodule.repository;

import com.learning.coursemodule.model.CourseModule;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseModuleRepository extends MongoRepository<CourseModule, String> {
    List<CourseModule> findByCourseIdOrderByOrderAsc(String courseId);
}
