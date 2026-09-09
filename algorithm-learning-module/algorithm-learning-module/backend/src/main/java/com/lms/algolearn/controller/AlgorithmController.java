package com.lms.algolearn.controller;

import com.lms.algolearn.dto.AlgorithmDetailDto;
import com.lms.algolearn.dto.AlgorithmSummaryDto;
import com.lms.algolearn.model.LearningLevel;
import com.lms.algolearn.service.AlgorithmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgorithmService algorithmService;

    /** GET /api/algorithms - full list, identical for every student. */
    @GetMapping
    public List<AlgorithmSummaryDto> listAll() {
        return algorithmService.listAll();
    }

    /**
     * GET /api/algorithms/{slug}?level=EASY|MEDIUM|HARD
     * `level` is optional; the frontend normally passes the student's
     * currently selected level from settings. Defaults to EASY.
     */
    @GetMapping("/{slug}")
    public AlgorithmDetailDto getOne(
            @PathVariable String slug,
            @RequestParam(defaultValue = "EASY") LearningLevel level) {
        return algorithmService.getBySlugAndLevel(slug, level);
    }
}
