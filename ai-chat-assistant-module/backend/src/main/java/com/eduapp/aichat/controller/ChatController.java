package com.eduapp.aichat.controller;

import com.eduapp.aichat.dto.AskRequest;
import com.eduapp.aichat.dto.ChatResponse;
import com.eduapp.aichat.dto.SimplifyRequest;
import com.eduapp.aichat.model.ChatMessage;
import com.eduapp.aichat.repository.ChatMessageRepository;
import com.eduapp.aichat.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // tighten this to your frontend origin in production
public class ChatController {

    private final ChatService chatService;
    private final ChatMessageRepository chatMessageRepository;

    public ChatController(ChatService chatService, ChatMessageRepository chatMessageRepository) {
        this.chatService = chatService;
        this.chatMessageRepository = chatMessageRepository;
    }

    /** 💬🧠 Student asks a doubt, AI explains, translated per saved/override language */
    @PostMapping("/ask")
    public ChatResponse ask(@Valid @RequestBody AskRequest request) {
        return chatService.ask(request);
    }

    /** 🔄 "Puriyala" — re-explain the last answer in a simpler way */
    @PostMapping("/simplify")
    public ChatResponse simplify(@Valid @RequestBody SimplifyRequest request) {
        return chatService.simplify(request.getStudentId(), request.getMessageId());
    }

    /** Chat history for a student */
    @GetMapping("/history/{studentId}")
    public List<ChatMessage> history(@PathVariable String studentId) {
        return chatMessageRepository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }
}
