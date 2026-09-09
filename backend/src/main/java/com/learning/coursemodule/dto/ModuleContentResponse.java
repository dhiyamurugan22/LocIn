package com.learning.coursemodule.dto;

import com.learning.coursemodule.model.TeachingLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleContentResponse {
    private String moduleId;
    private String title;
    private TeachingLevel level;
    private String summary;
    private String body;
    private int questionCount;
}
