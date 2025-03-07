package com.example.service.Impl;

import com.example.mapper.ShoppingMapper;
import com.example.model.Shopping;
import com.example.service.ShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 12209
 * @date 2024/12/1 22:13
 * @className ShoppingServicelmpl
 */
@Service
public class ShoppingServicelmpl implements ShoppingService {
    @Autowired
    private ShoppingMapper shoppingMapper;
    @Override
   public int aadshopping(Shopping shopping){
        return shoppingMapper.addshopping(shopping);
    }
    @Override
    public Shopping selectshopping(int shoppingid){
        return shoppingMapper.selectshopping(shoppingid);
    }
    @Override
    public <List>Shopping selectshoppingbyuserid(int userid){
        return shoppingMapper.selectshoppingbyuserid(userid);
    }
    @Override
    public  int deleteshoppingbyuserid(int userid){
        return shoppingMapper.deleteshoppingbyuserid(userid);
    }
    @Override
    public int deleteshopping(int shoppingid){
        return shoppingMapper.deleteshopping(shoppingid);
    }
    @Override
    public int updateshopping(Shopping shopping){
        return shoppingMapper.updateshopping(shopping);
    }
    @Override
    public  <List>Shopping selectshoppingall(){
        return shoppingMapper.selectshoppingall();
    }
}
