package com.example.util.zhipu_ai;

import lombok.Data;

import java.util.List;

@Data
public class ChatApiResponse {
    private int code;
    private String msg;
    private boolean success;
    private Data data;
    private Flowable flowable;
    private Error error;

    // Nested classes for Data, Flowable, and Error
    @lombok.Data
    public static class Data {
        private List<Choice> choices;
        private Usage usage;
        private String request_id;
        private Integer task_status;
        private Integer created;
        private String model;
        private String id;
    }

    @lombok.Data
    public static class Choice {
        private String finish_reason;
        private int index;
        private Message message;
    }

    @lombok.Data
    public static class Message {
        private String content;
        private String role;
    }

    @lombok.Data
    public static class Usage {
        private int completion_tokens;
        private int prompt_tokens;
        private int total_tokens;
    }

    @lombok.Data
    public static class Flowable {
    }

    @lombok.Data
    public static class Error {
        private int code;
        private String message;
    }
}