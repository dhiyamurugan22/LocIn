package com.eduapp.templatecustomization.config;

import com.eduapp.templatecustomization.model.Template;
import com.eduapp.templatecustomization.model.TemplateSettings;
import com.eduapp.templatecustomization.model.TemplateType;
import com.eduapp.templatecustomization.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Ensures the single system DEFAULT template and a small gallery of
 * SUGGESTED templates always exist. Runs idempotently on every boot —
 * it only inserts what's missing, it never overwrites a template a
 * student has already customized.
 */
@Component
@RequiredArgsConstructor
public class TemplateDataSeeder implements CommandLineRunner {

    private final TemplateRepository templateRepository;

    @Override
    public void run(String... args) {
        seedDefaultTemplate();
        seedSuggestedTemplates();
    }

    private void seedDefaultTemplate() {
        if (templateRepository.findFirstByType(TemplateType.DEFAULT).isPresent()) {
            return;
        }
        Template defaultTemplate = Template.builder()
                .name("Default")
                .description("The standard EduApp interface — clean, consistent, and available to every student from day one.")
                .previewImageUrl("/previews/default.png")
                .type(TemplateType.DEFAULT)
                .settings(TemplateSettings.builder().build()) // all built-in defaults
                .build();
        templateRepository.save(defaultTemplate);
    }

    private void seedSuggestedTemplates() {
        if (!templateRepository.findByType(TemplateType.SUGGESTED).isEmpty()) {
            return;
        }

        Template dark = Template.builder()
                .name("Focus Dark")
                .description("A dark, low-glare theme for distraction-free study sessions.")
                .previewImageUrl("/previews/focus-dark.png")
                .type(TemplateType.SUGGESTED)
                .settings(TemplateSettings.builder()
                        .colorTheme("dark")
                        .primaryColor("#818CF8")
                        .accentColor("#34D399")
                        .backgroundColor("#111827")
                        .layoutStyle("standard")
                        .navigationPosition("left")
                        .dashboardView("list")
                        .cardDensity("comfortable")
                        .build())
                .build();

        Template compact = Template.builder()
                .name("Compact Grid")
                .description("A dense, grid-based layout that fits more on screen at once — great for quick navigation.")
                .previewImageUrl("/previews/compact-grid.png")
                .type(TemplateType.SUGGESTED)
                .settings(TemplateSettings.builder()
                        .colorTheme("light")
                        .primaryColor("#4F46E5")
                        .accentColor("#F59E0B")
                        .backgroundColor("#FFFFFF")
                        .layoutStyle("compact")
                        .navigationPosition("top")
                        .dashboardView("grid")
                        .cardDensity("compact")
                        .fontSize("small")
                        .build())
                .build();

        Template highContrast = Template.builder()
                .name("High Contrast")
                .description("Bold colors and larger text for maximum readability and accessibility.")
                .previewImageUrl("/previews/high-contrast.png")
                .type(TemplateType.SUGGESTED)
                .settings(TemplateSettings.builder()
                        .colorTheme("high-contrast")
                        .primaryColor("#000000")
                        .accentColor("#FFD400")
                        .backgroundColor("#FFFFFF")
                        .layoutStyle("spacious")
                        .navigationPosition("left")
                        .dashboardView("list")
                        .cardDensity("comfortable")
                        .fontSize("large")
                        .build())
                .build();

        Template spacious = Template.builder()
                .name("Spacious Light")
                .description("A calm, airy layout with generous spacing and a soft color palette.")
                .previewImageUrl("/previews/spacious-light.png")
                .type(TemplateType.SUGGESTED)
                .settings(TemplateSettings.builder()
                        .colorTheme("light")
                        .primaryColor("#0EA5E9")
                        .accentColor("#A855F7")
                        .backgroundColor("#F8FAFC")
                        .layoutStyle("spacious")
                        .navigationPosition("right")
                        .dashboardView("grid")
                        .cardDensity("comfortable")
                        .fontSize("medium")
                        .build())
                .build();

        templateRepository.saveAll(java.util.List.of(dark, compact, highContrast, spacious));
    }
}
