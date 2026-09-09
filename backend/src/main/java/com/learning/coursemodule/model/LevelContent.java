package com.learning.coursemodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The same concept, written out once per teaching level. All three variants
 * exist for every module - the student's chosen level only decides which
 * one is served to them.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LevelContent {
    private String summary;
    private String body;
}
