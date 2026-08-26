package com.eduapp.aichat.service;

import com.eduapp.aichat.dto.AskRequest;
import com.eduapp.aichat.dto.ChatResponse;
import com.eduapp.aichat.model.ChatMessage;
import com.eduapp.aichat.model.StudentProfile;
import com.eduapp.aichat.repository.ChatMessageRepository;
import com.eduapp.aichat.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class ChatService {

    private final AIProvider aiProvider;
    private final TranslationService translationService;
    private final ChatMessageRepository chatMessageRepository;
    private final StudentProfileRepository studentProfileRepository;

    public ChatService(AIProvider aiProvider,
                        TranslationService translationService,
                        ChatMessageRepository chatMessageRepository,
                        StudentProfileRepository studentProfileRepository) {
        this.aiProvider = aiProvider;
        this.translationService = translationService;
        this.chatMessageRepository = chatMessageRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public ChatResponse ask(AskRequest request) {
        StudentProfile profile = studentProfileRepository.findById(request.getStudentId())
                .orElse(StudentProfile.builder()
                        .studentId(request.getStudentId())
                        .learningLevel("beginner")
                        .build());

        String prompt = buildPrompt(request.getQuestion(), profile, false);
        String englishAnswer = aiProvider.generateAnswer(prompt);

        return finalizeAndSave(request.getStudentId(), request.getCourseId(),
                request.getQuestion(), englishAnswer,
                resolveLanguage(request.getLanguageOverride(), profile), false);
    }

    /** 🔄 "Puriyala" flow — re-explain the previous answer in a simpler way */
    public ChatResponse simplify(String studentId, String messageId) {
        ChatMessage previous = chatMessageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Message not found: " + messageId));

        StudentProfile profile = studentProfileRepository.findById(studentId)
                .orElse(StudentProfile.builder().studentId(studentId).learningLevel("beginner").build());

        String prompt = buildPrompt(previous.getQuestion(), profile, true);
        String englishAnswer = aiProvider.generateAnswer(prompt);

        return finalizeAndSave(studentId, previous.getCourseId(),
                previous.getQuestion(), englishAnswer,
                resolveLanguage(null, profile), true);
    }

    private ChatResponse finalizeAndSave(String studentId, String courseId, String question,
                                          String englishAnswer, String language, boolean simplified) {
        boolean needsTranslation = language != null && !language.equalsIgnoreCase("en")
                && !language.equalsIgnoreCase("english");
        String finalAnswer = needsTranslation
                ? translationService.translate(englishAnswer, language)
                : englishAnswer;

        ChatMessage saved = chatMessageRepository.save(ChatMessage.builder()
                .studentId(studentId)
                .courseId(courseId)
                .question(question)
                .originalAnswer(englishAnswer)
                .translatedAnswer(needsTranslation ? finalAnswer : null)
                .languageUsed(language)
                .simplifiedRequest(simplified)
                .createdAt(Instant.now())
                .build());

        return ChatResponse.builder()
                .messageId(saved.getId())
                .answer(finalAnswer)
                .originalAnswer(englishAnswer)
                .languageUsed(language)
                .translated(needsTranslation)
                .build();
    }

    private String resolveLanguage(String override, StudentProfile profile) {
        if (override != null && !override.isBlank()) {
            return override; // 🔁 explicit change for this request
        }
        return Optional.ofNullable(profile.getPreferredLanguage()).orElse("English");
        // ⚙️ falls back to saved settings so the student doesn't pick every time
    }

    private String buildPrompt(String question, StudentProfile profile, boolean simplify) {
        String level = Optional.ofNullable(profile.getLearningLevel()).orElse("beginner");
        String background = Optional.ofNullable(profile.getBackground()).orElse("general student");

        StringBuilder sb = new StringBuilder();
        sb.append("You are a friendly AI teaching assistant for an online learning platform.\n");
        sb.append("Student learning level: ").append(level).append("\n");
        sb.append("Student background: ").append(background).append("\n");
        sb.append("Explain clearly. If the doubt is about programming or algorithms, ")
          .append("give a short explanation plus a small code example where useful.\n");

        if (simplify) {
            sb.append("The student said they did NOT understand your previous explanation. ")
              .append("Re-explain the SAME concept in a much simpler way, using an everyday analogy, ")
              .append("short sentences, and avoiding jargon.\n");
        }

        sb.append("\nStudent's doubt:\n").append(question);
        return sb.toString();
    }
}
