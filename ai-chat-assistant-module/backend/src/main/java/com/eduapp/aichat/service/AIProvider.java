package com.eduapp.aichat.service;

/**
 * Common contract so the rest of the app doesn't care whether
 * Gemini or OpenAI is answering the doubt.
 */
public interface AIProvider {

    /**
     * @param prompt       the fully built prompt (question + learning-level context)
     * @return AI-generated answer in English
     */
    String generateAnswer(String prompt);
}
