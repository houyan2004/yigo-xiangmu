package com.example.controller;

import com.example.model.Cart;
import com.example.model.Result;
import com.example.service.Impl.CartServiceimpl;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 12209
 * @date 2024/11/29 20:25
 * @className CartController
 */
@Slf4j
@RequestMapping("/yigo/cart")
@ResponseBody
@Controller
public class CartController {
    @Autowired
    private CartServiceimpl cartServiceimpl;
    @PostMapping("/add_cart")
    public Result addCart(@PathParam("cart") Cart cart){
        return Result.success(cartServiceimpl.insert_cart(cart));
    }



}
