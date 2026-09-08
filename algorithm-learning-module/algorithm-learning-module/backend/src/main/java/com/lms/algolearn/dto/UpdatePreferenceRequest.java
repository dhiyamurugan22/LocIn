package com.lms.algolearn.dto;

import com.lms.algolearn.model.LearningLevel;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePreferenceRequest {

    @NotNull(message = "preferredLevel is required (EASY, MEDIUM, or HARD)")
    private LearningLevel preferredLevel;
}
