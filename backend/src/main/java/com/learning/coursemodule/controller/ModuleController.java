package com.learning.coursemodule.controller;

import com.learning.coursemodule.dto.ModuleContentResponse;
import com.learning.coursemodule.dto.ModuleSummaryDto;
import com.learning.coursemodule.model.TeachingLevel;
import com.learning.coursemodule.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService moduleService;

    @GetMapping("/api/courses/{courseId}/modules")
    public List<ModuleSummaryDto> listModules(@PathVariable String courseId,
                                               @RequestParam String studentId) {
        return moduleService.summariesForCourse(courseId, studentId);
    }

    @GetMapping("/api/modules/{moduleId}/content")
    public ModuleContentResponse getContent(@PathVariable String moduleId,
                                             @RequestParam String studentId,
                                             @RequestParam TeachingLevel level) {
        return moduleService.getContent(moduleId, studentId, level);
    }
}
