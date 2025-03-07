package com.example.mapper;

import com.example.model.Cart;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author 12209
 * @date 2024/11/29 18:37
 * @className CartMapper
 */
@Mapper
public interface CartMapper {
//    添加购物车
    @Insert("insert into cart(carid,userid,proid,quantity,checked,createtime,updatetime) values(#{carid},#{userid},#{proid},#{quantity},#{checked},#{createtime},#{updatetime})")
    int insert_cart(Cart cart);
//  根据购物车id和用户id查询用户所有商品
    @Select("select * from cart where carid = #{carid} and userid = #{userid}")
    List<Cart> selectAll_cart(int carid, int userid);
//根据购物车id和用户id删除所有商品
    @Delete("delete from cart where carid = #{carid} and userid = #{userid}")
      int deleteAll_cart(int carid,int userid);
    //根据购物车id 和和用户id商品id删除指定商品
     @Delete("delete from cart where carid = #{carid}and userid=#{userid} and proid = #{proid}")
       int deleteOne_cart(int carid,int usreid,int proid);
//根据购物车id 用户id和商品id修改指定商品
     @Update("update cart set useid=#{useid},proid=#{proid},quantity=#{quantity},checked=#{checked},createtime=#{createtime},updatetime=#{updatetime} where carid = #{carid} and proid = #{proid}")
       int updateOne_cart(Cart cart);
//根据购物车id添加商品
    @Insert("insert into cart(carid,userid,proid,quantity,checked,createtime,updatetime) values(#{carid},#{userid},#{proid},#{quantity},#{checked},#{createtime},#{updatetime})")
     int insertOne_cart(Cart cart);
    //根据购物车id和用户id ,商品id查询指定商品
    @Select("select * from cart where carid = #{carid} and usreid=#{userid} and proid = #{proid}")
       Cart selectOne_cart(int carid,int userid,int proid);


}
