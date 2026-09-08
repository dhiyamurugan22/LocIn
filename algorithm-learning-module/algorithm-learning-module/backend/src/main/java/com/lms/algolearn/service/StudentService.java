package com.lms.algolearn.service;

import com.lms.algolearn.model.LearningLevel;
import com.lms.algolearn.model.Student;
import com.lms.algolearn.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public Student getById(String studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("No student found with id: " + studentId));
    }

    /**
     * A student can switch their preferred level at any time. This never
     * touches which algorithms they can see - only the depth used the
     * next time content is rendered for them.
     */
    public Student updatePreferredLevel(String studentId, LearningLevel newLevel) {
        Student student = getById(studentId);
        student.setPreferredLevel(newLevel);
        return studentRepository.save(student);
    }
}
