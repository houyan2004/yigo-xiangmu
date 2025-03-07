package com.example.service;

import com.example.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {
    // 根据openid查询用户
    User findUserByOpenid(String openid);

    // 添加用户
    int insertUser(User user);

    // 根据id查询用户
    User findUserById(Integer userId);

    // 根据用户名查询用户
    User findUserByUsername(String username);

    // 更新用户信息
    int updateUserById(User user);

    // 根据id删除用户
    int deleteUserById(Integer userId);

    // 分页条件查询用户
    List<User> findUserByPage(Integer page, Integer pageSize, LocalDateTime start, LocalDateTime end, Integer id,String username, String phone, String sex, String status);

    // 统计用户数量
    int count(LocalDateTime start, LocalDateTime end,
                     Integer id,String username, String phone, String sex, String status);

    // 批量删除用户
    void removeAllByUserId(List<Integer> userIdList);
}