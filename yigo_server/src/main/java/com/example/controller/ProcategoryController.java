package com.example.controller;/**
 * @author 繁星北斗
 * @CreateDate 2024/11/29
 * @ProjectDetails [<a>]
 */

import com.example.model.Procategory;
import com.example.model.Result;
import com.example.service.ProcategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 @ClassName 繁星北斗
 @Datetime 2024/11/29 11:12
 */
@Slf4j
@RestController
@RequestMapping("/yigo/proctegory")
public class ProcategoryController {
    @Autowired
    private ProcategoryService procategoryService;

    @PostMapping("/add")
    public Result add_procategory(@RequestBody Procategory procategory){
        log.info("添加分类信息：{}",procategory);
        return Result.success(procategoryService.add_procategory(procategory));
    }

    @PostMapping("/get")
    public Result get_parentid(@RequestBody Procategory procategory){
        log.info("根据父级分类id获取子级分类信息：{}",procategory.getParentid());
        return Result.success(procategoryService.list_procategory(procategory.getParentid()));
    }

    @GetMapping("/get/{cateid}")
    public Result get_procategory(@PathVariable("cateid") Integer cateid){
        log.info("根据分类id获取分类信息：{}",cateid);
        return Result.success(procategoryService.get_procategory(cateid));
    }

    @DeleteMapping("/delete/{cateid}")
    public Result delete_procategory(@PathVariable("cateid") Integer cateid){
        log.info("根据分类id删除分类信息：{}",cateid);
        return Result.success(procategoryService.delete_procategory(cateid));
    }

}
