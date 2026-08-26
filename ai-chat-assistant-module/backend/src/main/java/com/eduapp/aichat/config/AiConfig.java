package com.eduapp.aichat.config;

import com.eduapp.aichat.service.AIProvider;
import com.eduapp.aichat.service.GeminiService;
import com.eduapp.aichat.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiConfig {

    @Value("${ai.provider}")
    private String provider;

    /**
     * Switch provider purely from application.properties / env var
     * (AI_PROVIDER=gemini or AI_PROVIDER=openai). No code change needed.
     */
    @Bean
    public AIProvider aiProvider(GeminiService geminiService, OpenAiService openAiService) {
        return "openai".equalsIgnoreCase(provider) ? openAiService : geminiService;
    }
}
