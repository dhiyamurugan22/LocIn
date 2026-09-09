package com.eduapp.aichat.service;

import org.springframework.stereotype.Service;

/**
 * Translation Module.
 * Works connected to the AI Chat Module: takes the English AI answer
 * and translates it into whatever language the student has selected.
 */
@Service
public class TranslationService {

    private final AIProvider aiProvider;

    public TranslationService(AIProvider aiProvider) {
        this.aiProvider = aiProvider;
    }

    /**
     * @param text           English text to translate
     * @param targetLanguage e.g. "Tamil", "Hindi", "English"
     */
    public String translate(String text, String targetLanguage) {
        if (targetLanguage == null || targetLanguage.isBlank()
                || targetLanguage.equalsIgnoreCase("en")
                || targetLanguage.equalsIgnoreCase("english")) {
            return text; // no translation needed
        }

        String prompt = """
                Translate the following text into %s.
                Keep technical/programming terms (like variable names, keywords, function names) in English.
                Only return the translated text, nothing else.

                Text:
                %s
                """.formatted(targetLanguage, text);

        return aiProvider.generateAnswer(prompt);
    }
}
