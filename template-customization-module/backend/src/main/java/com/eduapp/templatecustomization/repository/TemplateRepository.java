package com.eduapp.templatecustomization.repository;

import com.eduapp.templatecustomization.model.Template;
import com.eduapp.templatecustomization.model.TemplateType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TemplateRepository extends MongoRepository<Template, String> {

    Optional<Template> findFirstByType(TemplateType type);

    List<Template> findByType(TemplateType type);

    List<Template> findByOwnerStudentId(String ownerStudentId);

    Optional<Template> findByIdAndOwnerStudentId(String id, String ownerStudentId);
}
