package com.example.mapper;

import com.example.model.Orderitem;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderitemMapper {

    // 插入方法，添加一个新的Orderitem记录到数据库
    @Insert("INSERT INTO orderitem (orderid, userid, proid, protitle, proimage, currentunitprice, quantity, totalprice, createtime, updatetime, status) VALUES (#{orderid}, #{userid}, #{proid}, #{protitle}, #{proimage}, #{currentunitprice}, #{quantity}, #{totalprice}, #{createtime}, #{updatetime}, #{status})")
    int insert(Orderitem orderitem);


    // 使用MyBatis注解定义SQL查询
    @Select("SELECT * FROM orderitem WHERE orderid = #{id}")
    Orderitem findById(Integer id);

    // 删除方法，通过id删除Orderitem
    @Delete("DELETE FROM orderitem WHERE id = #{id}")
    int deleteById(Integer id);

    // 更新方法，通过orderid修改Orderitem的status和updatetime
    @Update("UPDATE orderitem SET status = #{status}, updatetime = #{updatetime} WHERE orderid = #{id}")
    int updateStatusAndTimeByOrderid(Orderitem orderitem);


    // 查询方法，通过userid查询所有Orderitem记录
    @Select("SELECT * FROM orderitem WHERE userid = #{userid}")
    List<Orderitem> findByUserid(Integer userid);

    // 新增方法：通过userid和status查询Orderitem记录
    @Select("SELECT * FROM orderitem WHERE userid = #{userid} AND status = #{status}")
    List<Orderitem> findByStatus(Integer userid, Integer status);
}