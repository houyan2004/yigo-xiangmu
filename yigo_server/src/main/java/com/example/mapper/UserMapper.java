package com.example.mapper;

import com.example.model.Product;
import com.example.model.User;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO user (username, password, phone, sex, updatetime, createtime, status, touxianimg, openid, money) VALUES (#{username}, #{password}, #{phone}, #{sex}, #{updateTime}, #{createTime}, #{status}, #{touxianimg}, #{openid}, #{money})")
    int insert_user(User user);

    @Update("UPDATE user SET username = #{username}, password = #{password}, phone = #{phone}, sex = #{sex}, updatetime = #{updateTime}, status = #{status}, touxianimg = #{touxianimg},money = #{money} WHERE userid = #{userid}")
    int updateById_user(User user);

    @Select("SELECT * FROM user WHERE userid = #{userId}")
    User findUserById(Integer userId);

    @Select("SELECT * FROM user WHERE username = #{username}")
    User findUserByUsername(String username);

    @Delete("delete from user where userid = #{userid}")
    int deleteById_user(Integer userid);

    @Select("SELECT * FROM user WHERE openid = #{openid}")
    User findUserByOpenid(String openid);

    @Select("SELECT * FROM user WHERE username = #{username} and password = #{password}")
    User login_h_pw(String username, String password);

    List<User> findUserByPage(Integer offset, Integer limit, LocalDateTime start, LocalDateTime end, Integer id, String username, String phone, String sex, String status);

    int count(LocalDateTime start, LocalDateTime end, Integer id, String username, String phone, String sex, String status);

    void removeAllByUserId(List<Integer> userIdList);
}
