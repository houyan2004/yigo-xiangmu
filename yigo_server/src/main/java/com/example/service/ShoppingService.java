package com.example.service;

import com.example.model.Shopping;

/**
 * @author 12209
 * @date 2024/12/1 22:09
 * @className ShoppingService
 */
public interface ShoppingService {
    int aadshopping(Shopping shopping);
    Shopping selectshopping(int shoppingid);
    <List>Shopping selectshoppingbyuserid(int userid);
    int deleteshoppingbyuserid(int userid);
    int deleteshopping(int shoppingid);
    int updateshopping(Shopping shopping);
    <List>Shopping selectshoppingall();
}
