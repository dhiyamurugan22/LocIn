package com.eduapp.templatecustomization.model;

/**
 * Distinguishes the three kinds of templates the module deals with.
 *
 * DEFAULT    - the single system-provided template every student starts with.
 * SUGGESTED  - a pre-designed template offered as a ready-to-use alternative.
 * CUSTOM     - a template a student has personalized and saved for themselves.
 */
public enum TemplateType {
    DEFAULT,
    SUGGESTED,
    CUSTOM
}
