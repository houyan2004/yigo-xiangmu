package com.example.controller;

import com.example.mapper.UserMapper;
import com.example.model.Result;
import com.example.model.User;
import com.example.model.WeChatCode;
import com.example.service.UserService;
import com.example.util.JwtUtils;
import com.example.util.LocalDateTimeTypeAdapter;
import com.example.util.WeChatLoginVerify;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/yigo")
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeTypeAdapter())
            .create();

    @PostMapping("/login")
    public Result login(@RequestBody WeChatCode http) {
        log.info("code:{}", http.getCode());
        try {
            String[] res = WeChatLoginVerify.verifyCode(http.getCode());
            if (res == null) return Result.error("登录失败");
            log.info("openid:{}, session_key:{}", res[0], res[1]);
            if (res[0] == null) return Result.error("登录失败");
            User user = userService.findUserByOpenid(res[0]);
            if (user == null) {
                String username = RandomStringUtils.random(5);
                log.info("用户不存在，自动注册,用户名:{}", username);
                userService.insertUser(new User("保密", username, "18181035307", "", LocalDateTime.now(), LocalDateTime.now(), 1, res[0]));
                user = userService.findUserByOpenid(res[0]);
            }
            if (user != null) {
                Map<String, Object> claims = new HashMap<>();
                claims.put("userid", user.getUserid());
                claims.put("username", user.getUsername());
                user.setOpenid(null);
                return new Result(1, JwtUtils.generateJwt(claims), user);
            } else return Result.error("登录失败");
        } catch (IOException e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/login_h_kuai")
    public Result houduan_login_kuai(@RequestHeader(value = "token", required = false) String token){
        log.info("==================");
        log.info("启用快速登录接口login_h_kuai,token:{}",token);
        if (token != null){
            try {
                Map<String, Object> claims = JwtUtils.parseJWT(token);
                // 从 claims 中获取 user 字段，该字段是一个 JSON 字符串
                String userJson = (String) claims.get("user");
                // 将字符串解析为 JsonElement
                JsonElement userElement = JsonParser.parseString(userJson);
                // 将 JsonElement 转换为 User 对象
                User user2 = gson.fromJson(userElement, User.class);
                log.info("解析成功，令牌中用户信息:{}", user2);
                return new Result(1, token, user2);
            } catch (Exception e) {
                e.printStackTrace();
                log.info("token解析失败");
                return Result.error("token解析失败");
            }
        }
        log.info("token为空");
        return Result.error("token为空");
    }

    @PostMapping("login_h")
    public Result houduan_login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        log.info("用户名:{},密码:{}", username, password);
            User user1 = userMapper.login_h_pw(username, password);
            System.out.println(user1);
            if (user1 == null) return Result.error("用户名或密码错误");
            System.out.println("登录成功");
            user1.setPassword(null);
            user1.setOpenid(null);
            Map<String, Object> claims = new HashMap<>();
            claims.put("user", gson.toJson(user1, User.class));
            return new Result(1, JwtUtils.generateJwt(claims), user1);
    }

    @PostMapping("zhuce_h")
    public Result zhuce(@RequestBody User user){
        log.info("想要注册的，用户名:{},密码:{}", user.getUsername(), user.getPassword());
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
