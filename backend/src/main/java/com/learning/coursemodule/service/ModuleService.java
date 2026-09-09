package com.learning.coursemodule.service;

import com.learning.coursemodule.dto.ModuleContentResponse;
import com.learning.coursemodule.dto.ModuleSummaryDto;
import com.learning.coursemodule.model.CourseModule;
import com.learning.coursemodule.model.LevelContent;
import com.learning.coursemodule.model.StudentModuleProgress;
import com.learning.coursemodule.model.TeachingLevel;
import com.learning.coursemodule.repository.CourseModuleRepository;
import com.learning.coursemodule.repository.StudentModuleProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final CourseModuleRepository moduleRepository;
    private final StudentModuleProgressRepository progressRepository;

    public List<CourseModule> modulesForCourse(String courseId) {
        return moduleRepository.findByCourseIdOrderByOrderAsc(courseId);
    }

    public CourseModule getModule(String moduleId) {
        return moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found: " + moduleId));
    }

    /**
     * Every module in the course is listed for every student - nothing is hidden.
     * "unlocked" only controls whether the student may currently open/attempt it;
     * mastering module N is what unlocks module N+1.
     */
    public List<ModuleSummaryDto> summariesForCourse(String courseId, String studentId) {
        List<CourseModule> modules = modulesForCourse(courseId);
        List<String> moduleIds = modules.stream().map(CourseModule::getId).collect(Collectors.toList());
        Map<String, StudentModuleProgress> progressByModule = progressRepository
                .findByStudentIdAndModuleIdIn(studentId, moduleIds).stream()
                .collect(Collectors.toMap(StudentModuleProgress::getModuleId, p -> p));

        boolean previousMastered = true; // module 1 is always open
        List<ModuleSummaryDto> result = new java.util.ArrayList<>();
        for (CourseModule module : modules) {
            StudentModuleProgress progress = progressByModule.get(module.getId());
            boolean unlocked = previousMastered;
            result.add(new ModuleSummaryDto(
                    module.getId(),
                    module.getTitle(),
                    module.getOrder(),
                    unlocked,
                    progress != null && progress.isMasteryAchieved(),
                    progress != null ? progress.bestScorePercent() : null,
                    progress != null ? progress.getSelectedLevel() : null
            ));
            previousMastered = progress != null && progress.isMasteryAchieved();
        }
        return result;
    }

    public boolean isModuleUnlocked(CourseModule module, String studentId) {
        if (module.getOrder() <= 1) {
            return true;
        }
        return modulesForCourse(module.getCourseId()).stream()
                .filter(m -> m.getOrder() == module.getOrder() - 1)
                .findFirst()
                .map(previous -> progressRepository.findByStudentIdAndModuleId(studentId, previous.getId())
                        .map(StudentModuleProgress::isMasteryAchieved)
                        .orElse(false))
                .orElse(true);
    }

    /**
     * Serves the module's content in the student's chosen teaching level and
     * records that choice. This is called every time a module is opened, so a
     * student revisiting a completed module is naturally asked again - whatever
     * level they pick here simply becomes the new "last selected" level.
     */
    public ModuleContentResponse getContent(String moduleId, String studentId, TeachingLevel level) {
        CourseModule module = getModule(moduleId);
        if (!isModuleUnlocked(module, studentId)) {
            throw new IllegalStateException("Module is locked until the previous module reaches 80% mastery.");
        }

        LevelContent content = module.getContentByLevel().get(level);
        if (content == null) {
            throw new IllegalArgumentException("No content authored for level " + level + " on this module.");
        }

        StudentModuleProgress progress = progressRepository
                .findByStudentIdAndModuleId(studentId, moduleId)
                .orElseGet(() -> {
                    StudentModuleProgress p = new StudentModuleProgress();
                    p.setStudentId(studentId);
                    p.setModuleId(moduleId);
                    return p;
                });
        progress.setSelectedLevel(level);
        progressRepository.save(progress);

        int questionCount = module.getAssessmentQuestions() == null ? 0 : module.getAssessmentQuestions().size();
        return new ModuleContentResponse(module.getId(), module.getTitle(), level, content.getSummary(),
                content.getBody(), questionCount);
    }
}
