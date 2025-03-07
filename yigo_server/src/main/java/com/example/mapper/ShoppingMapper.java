package com.example.mapper;

import com.example.model.Shopping;
import org.apache.ibatis.annotations.*;

/**
 * @author 12209
 * @date 2024/12/1 21:31
 * @className ShoppingMapper
 */
@Mapper
public interface ShoppingMapper {
    //    添加收货地址
       int addshopping(Shopping shopping);
       // 根据收货地址id 查询地址
    @Select("select * from shopping where shoppingid=#{shoppingid}")
    Shopping selectshopping(int shoppingid);
    //    根据用户id 查询所有地址
    @Select("select * from shopping where userid=#{userid}")
    <List>Shopping selectshoppingbyuserid(int userid);
    //    根据用户id 删除地址
    @Delete("delete from shopping where userid=#{userid}")
    int deleteshoppingbyuserid(int userid);
    //    根据收货地址id 删除地址
    @Delete("delete from shopping where shoppingid=#{shoppingid}")
    int deleteshopping(int shoppingid);
    //    根据收货地址id 修改地址
    @Update("update shopping set userid=#{userid},receivername=#{receivername},receivermobile=#{receivermobile},receiverdistrict=#{receiverdistrict},receiveraddress=#{receiveraddress},createtime=#{createtime},uodatetime=#{updatetime},where shoppingid=#{shoppingid}")
    int updateshopping(Shopping shopping);
    //    查询所有收货地址
    @Select("select * from shopping")
    <List>Shopping selectshoppingall();
}
