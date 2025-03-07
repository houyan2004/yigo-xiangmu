package com.example.controller;


import com.example.model.Result;
import com.example.service.MenucategoryService;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author 12209
 * @date 2024/12/3 9:56
 * @className MenucatgoryController
 */
@Slf4j
@RestController
@RequestMapping("/yigo/menucategory")
public class MenucategoryController {
    @Autowired
    private MenucategoryService menucategoryServicelmpl;
     @GetMapping("/list")
    public Result list(@PathParam("sonid") Integer sonid,
                       @PathParam("parentid") Integer parentid) {
        System.out.println("到底能不能找到啊");
        // 如果参数是必须的，则去掉required = false
        return Result.success(menucategoryServicelmpl.all_list(sonid, parentid));
    }
}