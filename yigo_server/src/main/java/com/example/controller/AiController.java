package com.example.controller;
import com.example.model.Result;
import com.example.util.zhipu_ai.ChatApiResponse;
import com.example.util.zhipu_ai.ZhipuAI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/yigo/ai")
public class AiController {
    @Autowired
    private ZhipuAI zhipuAI;

    @PostMapping("/chat")
    public Result chattext(@RequestBody Result req){
        log.info("prompt: {}",req.getMsg());
        ChatApiResponse chat = zhipuAI.chat(req.getMsg());
        if (chat.getCode() != 200){
            log.info("chat: {}",chat);
            return new Result(chat.getCode(),chat.getMsg(),chat.getError());
        }
        log.info("chat: {}",chat);
        return Result.success(zhipuAI.chat(req.getMsg()).getData().getChoices().get(0).getMessage().getContent());
    }
}
