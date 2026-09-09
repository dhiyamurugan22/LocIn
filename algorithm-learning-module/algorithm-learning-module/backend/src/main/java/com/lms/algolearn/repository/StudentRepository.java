package com.lms.algolearn.repository;

import com.lms.algolearn.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
}
