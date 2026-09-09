package com.eduapp.templatecustomization.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The actual set of appearance / layout / UX options a template controls.
 *
 * Deliberately scoped to presentation only — nothing here touches
 * courses, assessments, or any academic/content data, in line with
 * the module's requirement that customization never affects
 * learning content.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateSettings {

    // ---- Layout ----
    @Builder.Default
    private String layoutStyle = "standard";      // standard | compact | spacious
    @Builder.Default
    private String navigationPosition = "left";   // left | top | right
    @Builder.Default
    private boolean sidebarCollapsed = false;
    @Builder.Default
    private String dashboardView = "grid";        // grid | list

    // ---- Appearance ----
    @Builder.Default
    private String colorTheme = "light";          // light | dark | high-contrast | custom
    @Builder.Default
    private String primaryColor = "#4F46E5";
    @Builder.Default
    private String accentColor = "#22C55E";
    @Builder.Default
    private String backgroundColor = "#FFFFFF";
    @Builder.Default
    private String fontFamily = "Inter";
    @Builder.Default
    private String fontSize = "medium";           // small | medium | large

    // ---- Organization ----
    @Builder.Default
    private String cardDensity = "comfortable";   // comfortable | compact
    @Builder.Default
    private boolean showWelcomeBanner = true;
}
