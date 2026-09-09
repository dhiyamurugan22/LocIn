package com.learning.coursemodule.controller;

import com.learning.coursemodule.model.Course;
import com.learning.coursemodule.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public List<Course> listCourses() {
        return courseService.listCourses();
    }

    @GetMapping("/{courseId}")
    public Course getCourse(@PathVariable String courseId) {
        return courseService.getCourse(courseId);
    }
}
