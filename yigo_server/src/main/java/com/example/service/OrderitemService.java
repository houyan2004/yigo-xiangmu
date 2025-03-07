package com.example.service;

import com.example.model.Orderitem;
import java.util.List;

public interface OrderitemService {
    Orderitem getOrderDetail(Integer orderId);
    Orderitem getOrderDetailByUser(Integer userId, Integer orderId);
    List<Orderitem> findByUserid(Integer userid);
    List<Orderitem> findByStatus(Integer userid, Integer status);

    int saveOrderitem(Orderitem orderitem);

    // 删除订单
    boolean deleteOrder(Integer id);
}
