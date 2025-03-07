package com.example.controller;

import com.example.model.Result;
import com.example.model.Shopping;
import com.example.service.ShoppingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 12209
 * @date 2024/12/1 23:31
 * @className ShoppingController
 */
@Slf4j
@RequestMapping("/yigo/muen")
@ResponseBody
@Controller
public class ShoppingController {
    @Autowired
    private ShoppingService shoppingService;


}
