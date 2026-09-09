package com.eduapp.templatecustomization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Template Customization Module.
 *
 * This module can run standalone (for development/testing) or be
 * imported as a component into the larger EduApp platform, which
 * also hosts the AI Chat Assistant and Algorithm Learning modules.
 */
@SpringBootApplication
public class TemplateCustomizationApplication {
    public static void main(String[] args) {
        SpringApplication.run(TemplateCustomizationApplication.class, args);
    }
}
