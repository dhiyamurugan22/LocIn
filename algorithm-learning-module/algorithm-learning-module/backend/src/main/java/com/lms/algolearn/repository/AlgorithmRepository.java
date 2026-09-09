package com.lms.algolearn.repository;

import com.lms.algolearn.model.Algorithm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AlgorithmRepository extends MongoRepository<Algorithm, String> {
    Optional<Algorithm> findBySlug(String slug);
}
