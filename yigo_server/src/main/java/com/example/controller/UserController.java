package com.example.controller;
import com.example.model.Lists;
import com.example.model.Result;
import com.example.model.TjianSerach;
import com.example.model.User;
import com.example.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/yigo")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/userSearch")
    public Result userSearch(@RequestBody TjianSerach serach) {
         List<User> userList = userService.findUserByPage(serach.getPage(), serach.getPageSize(),
                 serach.getStart(), serach.getEnd(),
                 serach.getId(), serach.getUsername(),
                 serach.getPhone(), serach.getSex(), serach.getStatut());
        log.info("查询用户列表，第{}页，每页{}条，开始时间：{}，结束时间：{}，" +
                        "用户id：{}，用户名：{}，手机号：{}，性别：{}，状态：{}",
                serach.getPage(), serach.getPageSize(), serach.getStart(), serach.getEnd(),
                serach.getId(), serach.getUsername(), serach.getPhone(), serach.getSex(), serach.getStatut());
        log.info("查询到用户列表，共{}条", userList.size());
          int count = userService.count(serach.getStart(), serach.getEnd(),
                        serach.getId(), serach.getUsername(), serach.getPhone(),
                  serach.getSex(), serach.getStatut());
          return new Result(1, Integer.toString(count), userList);
    }

    @PostMapping("/removeAllByUserId")
    public Result removeAllByUserId(@RequestBody Lists lists) {
        log.info("删除用户id为：{}", lists.getUserIdArr());
        userService.removeAllByUserId(lists.getUserIdArr());
        return Result.success();
    }

    @PutMapping("/updateUser")
    public Result updateUser(@RequestBody User user) {
        log.info("修改用户信息：{}", user);
        User old = userService.findUserById(user.getUserid());
        log.info("修改前后用户名：{}，{}", old.getUsername(), user.getUsername());
        if(!old.getUsername().equals(user.getUsername())){
            if(userService.findUserByUsername(user.getUsername())!=null){
                log.info("用户名已存在");
                return Result.error("用户名已存在");
            }
            log.info("用户名不重复");
        }
        if (userService.updateUserById(user)==0) return Result.error("修改失败");
        log.info("修改成功");
        return new Result(1, "修改成功",null);
    }

    @PostMapping("/addUser")
    public Result addUser(@RequestBody User user) {
        log.info("添加用户：{}", user);
        if (user.getUsername()==null||user.getUsername().equals("")){
            return Result.error("用户名不能为空");
        }
        if (user.getMoney()==null)user.setMoney(BigDecimal.valueOf(0.00));
        if(userService.findUserByUsername(user.getUsername())!=null){
            log.info("用户名已存在");
            return Result.error("用户名已存在");
        }
        log.info("用户名不重复，可以注册");
        int i = userService.insertUser(user);
        if (i==0) return Result.error("注册失败,sql语句执行失败");
        log.info("注册成功");
        return new Result(1, "注册成功",null);
    }

}



