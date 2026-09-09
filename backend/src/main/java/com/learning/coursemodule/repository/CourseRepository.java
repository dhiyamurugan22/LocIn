package com.learning.coursemodule.repository;

import com.learning.coursemodule.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findAllByOrderByOrderAsc();
}
