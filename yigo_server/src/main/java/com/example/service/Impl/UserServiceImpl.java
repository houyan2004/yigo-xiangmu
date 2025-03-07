package com.example.service.Impl;

import com.example.mapper.UserMapper;
import com.example.model.User;
import com.example.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public int insertUser(User user) {
        // 设置创建时间和更新时间为当前时间
        LocalDateTime now = LocalDateTime.now();
        user.setCreateTime(now);
        user.setUpdateTime(now);
        return userMapper.insert_user(user);
    }


    public User findUserByOpenid(String openid) {
        return userMapper.findUserByOpenid(openid);
    }

    @Override
    public User findUserById(Integer userId) {
        return userMapper.findUserById(userId);
    }

    @Override
    public User findUserByUsername(String username) {
        return userMapper.findUserByUsername(username);
    }

    @Override
    public int updateUserById(User user) {
        // 设置更新时间为当前时间
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById_user(user);
    }
    @Override
    public int deleteUserById(Integer userId) {
        return userMapper.deleteById_user(userId);
    }

    @Override
    public List<User> findUserByPage(Integer page, Integer pageSize, LocalDateTime start, LocalDateTime end,
                                     Integer id,String username, String phone, String sex, String status) {
        return userMapper.findUserByPage((page-1)*pageSize, pageSize, start, end,
                id,username, phone, sex, status);
    }

    @Override
    public int count(LocalDateTime start, LocalDateTime end,
                     Integer id,String username, String phone, String sex, String status) {
        return userMapper.count(start, end,
                id,username, phone, sex, status);
    }

    @Override
    public void removeAllByUserId(List<Integer> userIdList) {
        userMapper.removeAllByUserId(userIdList);
    }


}
