package com.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
public class User {
    private Integer userid;
    private String sex;//性别
    private String username;//昵称
    private String phone;
    private String touxianimg;//头像，存放头像图片地址
    private LocalDateTime createTime; // 创建时间
    private LocalDateTime updateTime; // 更新时间
    private Integer status; // 用户状态
    private String openid; // 微信用户的唯一标识
    private String password; // 密码
    private BigDecimal money = BigDecimal.valueOf(0.00); // 用户余额


    public User(String sex, String username, String phone, String touxianimg, LocalDateTime createTime, LocalDateTime updateTime, Integer status, String openid ) {
        this.sex = sex;
        this.username = username;
        this.phone = phone;
        this.touxianimg = touxianimg;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.status = status;
        this.openid = openid;
    }
    public User(Integer userid, String sex, String username, String phone, String touxianimg, LocalDateTime createTime, LocalDateTime updateTime, Integer status, String openid, String password, BigDecimal money) {
        this.userid = userid;
        this.sex = sex;
        this.username = username;
        this.phone = phone;
        this.touxianimg = touxianimg;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.status = status;
        this.openid = openid;
        this.password = password;
        this.money = money;
    }

    public User() {
    }
}
