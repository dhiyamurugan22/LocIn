package com.learning.coursemodule.service;

import com.learning.coursemodule.model.Course;
import com.learning.coursemodule.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> listCourses() {
        return courseRepository.findAllByOrderByOrderAsc();
    }

    public Course getCourse(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found: " + courseId));
    }
}
