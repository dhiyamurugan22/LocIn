package com.learning.coursemodule.controller;

import com.learning.coursemodule.dto.AssessmentQuestionDto;
import com.learning.coursemodule.dto.AssessmentResultResponse;
import com.learning.coursemodule.dto.AssessmentSubmissionRequest;
import com.learning.coursemodule.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules/{moduleId}/assessment")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @GetMapping("/questions")
    public List<AssessmentQuestionDto> getQuestions(@PathVariable String moduleId,
                                                      @RequestParam String studentId) {
        return assessmentService.getQuestions(moduleId, studentId);
    }

    @PostMapping("/submit")
    public AssessmentResultResponse submit(@PathVariable String moduleId,
                                            @RequestBody AssessmentSubmissionRequest request) {
        return assessmentService.submit(moduleId, request);
    }
}
