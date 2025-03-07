package com.example.service.Impl;

import com.example.mapper.OrderitemMapper;
import com.example.model.Orderitem;
import com.example.service.OrderitemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderitemServiceImpl implements OrderitemService {

    @Autowired
    private OrderitemMapper orderitemMapper;

    @Override
    public Orderitem getOrderDetail(Integer orderId) {
        return orderitemMapper.findById(orderId);
    }

    @Override
    public Orderitem getOrderDetailByUser(Integer userId, Integer orderId) {
        // 这里假设每个用户订单号是唯一的，直接通过orderId查询
        Orderitem orderitem = orderitemMapper.findById(orderId);
        if (orderitem != null && orderitem.getUserid().equals(userId)) {
            return orderitem;
        }
        return null;
    }

    @Override
    public List<Orderitem> findByUserid(Integer userid) {
        return orderitemMapper.findByUserid(userid);
    }

    @Override
    public List<Orderitem> findByStatus(Integer userid, Integer status) {
        return orderitemMapper.findByStatus(userid, status);
    }

    @Override
    public int saveOrderitem(Orderitem orderitem) {
        // 这里可以添加一些业务逻辑，比如验证订单数据
        LocalDateTime now = LocalDateTime.now();
        orderitem.setCreatetime(now);
        orderitem.setUpdatetime(now);
        return orderitemMapper.insert(orderitem);
    }

    @Override
    public boolean deleteOrder(Integer id) {
        return orderitemMapper.deleteById(id) > 0;
    }
}
