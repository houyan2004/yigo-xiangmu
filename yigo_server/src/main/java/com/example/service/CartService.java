package com.example.service;

import com.example.model.Cart;

import java.util.List;

public interface CartService {
//    添加购物车
    int insert_cart(Cart cart);
    //    删除购根据购物车id物车
    int deleteAll_cart(int carid,int userid);
//    根据购物车id查询购物车
   List<Cart> selectAll_cart(int carid, int userid);
//    根据购物车id和用户id,商品id删除指定商品
int deleteOne_cart(int carid,int usreid,int proid);
    //根据购物车id 和商品id修改指定商品
    int updateOne_cart(Cart cart);
    //根据购物车id添加商品
    int insertOne_cart(Cart cart);
    //根据购物车id和商品id查询指定商品
    Cart selectOne_cart(int carid,int userid,int proid);
}
