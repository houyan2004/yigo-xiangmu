package com.example.util.zhipu_ai;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zhipu.oapi.ClientV4;
import com.zhipu.oapi.Constants;
import com.zhipu.oapi.service.v4.model.ChatCompletionRequest;
import com.zhipu.oapi.service.v4.model.ChatMessage;
import com.zhipu.oapi.service.v4.model.ChatMessageRole;
import com.zhipu.oapi.service.v4.model.ModelApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Component
public class ZhipuAI {
    private final ClientV4 client;
    private final String requestIdTemplate;
    private final ObjectMapper mapper;
    private final List<ChatMessage> messages = new ArrayList<>();
    public ZhipuAI() {
        this.client = new ClientV4.Builder("5e6555a49926981ed65490a7eb779b5f.gcMAUX2rwlMrcX10").build();
        this.requestIdTemplate = "req-%d";
        this.mapper = new ObjectMapper();
    }
    public ChatApiResponse chat(String prompt) {
        ChatMessage chatMessage = new ChatMessage(ChatMessageRole.USER.value(), prompt);
        messages.add(chatMessage); // 添加新的用户消息到列表
        String requestId = String.format(requestIdTemplate, System.currentTimeMillis());
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                .model(Constants.ModelCharGLM3)
                .stream(Boolean.FALSE)
                .invokeMethod(Constants.invokeMethod)
                .messages(messages) // 使用当前的消息列表
                .requestId(requestId)
                .build();
        ChatApiResponse response = new ChatApiResponse();
        try {
            ModelApiResponse invokeModelApiResp = client.invokeModelApi(chatCompletionRequest);
            String modelOutput = mapper.writeValueAsString(invokeModelApiResp);
            log.info("model output: {}", modelOutput);
            response = mapper.readValue(modelOutput, ChatApiResponse.class);
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON response", e);
        }
        return response;
    }
}