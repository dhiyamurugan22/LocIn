package com.learning.coursemodule.service;

import com.learning.coursemodule.dto.AssessmentQuestionDto;
import com.learning.coursemodule.dto.AssessmentResultResponse;
import com.learning.coursemodule.dto.AssessmentSubmissionRequest;
import com.learning.coursemodule.model.AssessmentAttempt;
import com.learning.coursemodule.model.AssessmentQuestion;
import com.learning.coursemodule.model.CourseModule;
import com.learning.coursemodule.model.StudentModuleProgress;
import com.learning.coursemodule.repository.StudentModuleProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final ModuleService moduleService;
    private final StudentModuleProgressRepository progressRepository;

    @Value("${app.mastery-threshold:0.8}")
    private double masteryThreshold;

    public List<AssessmentQuestionDto> getQuestions(String moduleId, String studentId) {
        CourseModule module = moduleService.getModule(moduleId);
        if (!moduleService.isModuleUnlocked(module, studentId)) {
            throw new IllegalStateException("Module is locked until the previous module reaches 80% mastery.");
        }
        List<AssessmentQuestion> questions = module.getAssessmentQuestions();
        if (questions == null) {
            return List.of();
        }
        return questions.stream()
                .map(q -> new AssessmentQuestionDto(q.getQuestionId(), q.getPrompt()))
                .collect(Collectors.toList());
    }

    public AssessmentResultResponse submit(String moduleId, AssessmentSubmissionRequest request) {
        CourseModule module = moduleService.getModule(moduleId);
        if (!moduleService.isModuleUnlocked(module, request.getStudentId())) {
            throw new IllegalStateException("Module is locked until the previous module reaches 80% mastery.");
        }

        List<AssessmentQuestion> questions = module.getAssessmentQuestions();
        if (questions == null || questions.isEmpty()) {
            throw new IllegalStateException("This module has no assessment questions configured.");
        }

        Map<String, Boolean> perQuestionResult = new HashMap<>();
        int correct = 0;
        for (AssessmentQuestion question : questions) {
            String submitted = request.getAnswers() == null ? null : request.getAnswers().get(question.getQuestionId());
            boolean isCorrect = isAnswerCorrect(submitted, question.getAcceptableAnswers());
            perQuestionResult.put(question.getQuestionId(), isCorrect);
            if (isCorrect) {
                correct++;
            }
        }

        double scorePercent = (correct * 100.0) / questions.size();
        boolean passedThisAttempt = scorePercent >= masteryThreshold * 100.0;

        StudentModuleProgress progress = progressRepository
                .findByStudentIdAndModuleId(request.getStudentId(), moduleId)
                .orElseGet(() -> {
                    StudentModuleProgress p = new StudentModuleProgress();
                    p.setStudentId(request.getStudentId());
                    p.setModuleId(moduleId);
                    return p;
                });

        progress.getAttempts().add(new AssessmentAttempt(scorePercent, passedThisAttempt, Instant.now()));
        // Once 80% mastery is reached, it sticks - a later lower-scoring retry (e.g. while
        // exploring a harder level) does not re-lock progress the student already earned.
        progress.setMasteryAchieved(progress.isMasteryAchieved() || passedThisAttempt);
        progressRepository.save(progress);

        return new AssessmentResultResponse(
                scorePercent,
                passedThisAttempt,
                masteryThreshold * 100.0,
                progress.isMasteryAchieved(),
                perQuestionResult
        );
    }

    private boolean isAnswerCorrect(String submitted, List<String> acceptableAnswers) {
        if (submitted == null || acceptableAnswers == null) {
            return false;
        }
        String normalizedSubmitted = submitted.trim().toLowerCase();
        return acceptableAnswers.stream()
                .anyMatch(accepted -> accepted.trim().toLowerCase().equals(normalizedSubmitted));
    }
}
