package com.lms.algolearn.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Lightweight view used for the "all algorithms" list.
 * Every student sees the exact same list - nothing is filtered by level.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmSummaryDto {
    private String slug;
    private String name;
    private String category;
    private String summary;
}
