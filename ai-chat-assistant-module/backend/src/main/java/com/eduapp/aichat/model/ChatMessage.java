package com.eduapp.aichat.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessage {

    @Id
    private String id;

    private String studentId;
    private String courseId;

    /** The doubt/question the student asked */
    private String question;

    /** Raw AI answer, always kept in English internally */
    private String originalAnswer;

    /** Answer translated into the student's selected language (if any) */
    private String translatedAnswer;

    private String languageUsed;

    /** True if this message was a "please simplify" follow-up */
    private boolean simplifiedRequest;

    private Instant createdAt;
}
