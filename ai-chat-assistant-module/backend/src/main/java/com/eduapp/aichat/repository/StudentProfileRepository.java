package com.eduapp.aichat.repository;

import com.eduapp.aichat.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {
}
