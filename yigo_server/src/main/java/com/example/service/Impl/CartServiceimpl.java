package com.example.service.Impl;

import com.example.mapper.CartMapper;
import com.example.model.Cart;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 12209
 * @date 2024/11/29 20:19
 * @className CartServiceimpl
 */
@Service
public class CartServiceimpl implements CartService {
    @Autowired
    private CartMapper cartMapper;
    @Override
    public  int insert_cart(Cart cart){
        return cartMapper.insert_cart(cart);
    }
    @Override
   public int deleteAll_cart(int carid,int userid){
        return cartMapper.deleteAll_cart(carid,userid);
    }
    @Override
    public List<Cart> selectAll_cart(int carid, int userid){
        return cartMapper.selectAll_cart(carid,userid);
    }
    @Override
    public int deleteOne_cart(int carid,int userid,int proid){
        return cartMapper.deleteOne_cart(carid,userid,proid);
    }
    //根据购物车id 和商品id修改指定商品
    @Override
     public int updateOne_cart(Cart cart){
        return cartMapper.updateOne_cart(cart);
    }
     @Override
    public int insertOne_cart(Cart cart){
        return cartMapper.insertOne_cart(cart);
     }
     @Override
    public   Cart selectOne_cart(int carid,int userid,int proid){
        return cartMapper.selectOne_cart(carid,userid,proid);
     }
}
