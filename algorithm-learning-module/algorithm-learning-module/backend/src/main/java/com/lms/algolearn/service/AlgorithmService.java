package com.lms.algolearn.service;

import com.lms.algolearn.dto.AlgorithmDetailDto;
import com.lms.algolearn.dto.AlgorithmSummaryDto;
import com.lms.algolearn.model.Algorithm;
import com.lms.algolearn.model.LearningLevel;
import com.lms.algolearn.model.LevelContent;
import com.lms.algolearn.repository.AlgorithmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlgorithmService {

    private final AlgorithmRepository algorithmRepository;

    /**
     * Every student gets this exact same list, in the exact same order,
     * regardless of their preferred level. Level never filters which
     * algorithms are returned.
     */
    public List<AlgorithmSummaryDto> listAll() {
        return algorithmRepository.findAll().stream()
                .map(a -> AlgorithmSummaryDto.builder()
                        .slug(a.getSlug())
                        .name(a.getName())
                        .category(a.getCategory())
                        .summary(a.getSummary())
                        .build())
                .toList();
    }

    /**
     * Fetch one algorithm rendered at the given level. If that exact level
     * isn't authored for this algorithm yet, we fall back to the nearest
     * available depth rather than hiding the algorithm entirely - a student
     * should never see "not available" just because of their chosen level.
     */
    public AlgorithmDetailDto getBySlugAndLevel(String slug, LearningLevel requestedLevel) {
        Algorithm algorithm = algorithmRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("No algorithm found for slug: " + slug));

        LearningLevel levelToUse = resolveAvailableLevel(algorithm, requestedLevel);
        LevelContent content = algorithm.getContentByLevel().get(levelToUse);

        return AlgorithmDetailDto.builder()
                .slug(algorithm.getSlug())
                .name(algorithm.getName())
                .category(algorithm.getCategory())
                .summary(algorithm.getSummary())
                .levelShown(levelToUse)
                .content(content)
                .build();
    }

    private LearningLevel resolveAvailableLevel(Algorithm algorithm, LearningLevel requested) {
        if (algorithm.getContentByLevel().containsKey(requested)) {
            return requested;
        }
        // Fallback order: try EASY, then MEDIUM, then HARD - whichever exists first.
        for (LearningLevel fallback : List.of(LearningLevel.EASY, LearningLevel.MEDIUM, LearningLevel.HARD)) {
            if (algorithm.getContentByLevel().containsKey(fallback)) {
                return fallback;
            }
        }
        throw new ResourceNotFoundException("No content authored yet for algorithm: " + algorithm.getSlug());
    }
}
