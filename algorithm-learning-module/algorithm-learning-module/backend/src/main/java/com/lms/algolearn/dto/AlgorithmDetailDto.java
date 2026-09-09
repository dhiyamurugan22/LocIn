package com.lms.algolearn.dto;

import com.lms.algolearn.model.LearningLevel;
import com.lms.algolearn.model.LevelContent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Full detail for one algorithm, rendered at ONE requested/preferred level.
 * `levelShown` tells the frontend which depth it got back, so the UI can
 * keep the level toggle in sync.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmDetailDto {
    private String slug;
    private String name;
    private String category;
    private String summary;
    private LearningLevel levelShown;
    private LevelContent content;
}
