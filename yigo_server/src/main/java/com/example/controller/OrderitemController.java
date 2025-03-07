package com.example.controller;

import com.example.model.Orderitem;
import com.example.model.Result;
import com.example.service.OrderitemService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/yigo/order")
public class OrderitemController {

    @Autowired
    private OrderitemService orderitemService;

    @GetMapping("/detail/{orderId}")
    public Result getOrderDetail(@PathVariable("orderId") Integer orderId) {
//        Orderitem orderitem=new Orderitem();
//        return Result.success(orderitem);
        try {
            Orderitem orderDetail = orderitemService.getOrderDetail(orderId);
            if (orderDetail != null) {
                return Result.success(orderDetail);
            } else {
                return Result.error("订单详情不存在");
            }

        } catch (Exception e) {
            return Result.error("获取订单详情失败: " + e.getMessage());
        }
    }


    //获取所有订单
    @PostMapping("/orderByUser")
    public Result getOrderDetailByUser(@RequestParam("userId") Integer userId, @RequestParam("Id") Integer Id) {
        try {
            // 假设这里有一个方法可以根据userId和Id获取订单详情
            Orderitem orderDetail = orderitemService.getOrderDetailByUser(userId, Id);
            if (orderDetail != null) {
                return Result.success(orderDetail);
            } else {
                return Result.error("订单详情不存在");
            }
        } catch (Exception e) {
            return Result.error("获取订单详情失败: " + e.getMessage());
        }

//        Orderitem orderitem=new Orderitem();
//        return Result.success(orderitem);
    }






    @GetMapping("/getListOrder/{userId}")
    public Result getOrdersByUser(@PathVariable("userId") Integer userId) {
        try {
            List<Orderitem> orders = orderitemService.findByUserid(userId);
            if (!orders.isEmpty()) {
                System.out.println(orders);
                return Result.success(orders);
            } else {
                return Result.error("没有找到用户订单");
            }
        } catch (Exception e) {
            return Result.error("获取用户订单失败: " + e.getMessage());
        }
    }
    //添加订单
    @PostMapping("/add")
    public Result addOrder(@RequestBody Orderitem order) {
        try {
            if (order!=null){
                return Result.success(orderitemService.saveOrderitem(order));

            }
            else {
                return Result.error("订单信息为空");
            }
        } catch (Exception e) {
            return Result.error("添加订单失败: " + e.getMessage());
            // 处理异常，比如返回错误信息

        }
    }
    // 删除订单
    @DeleteMapping("/delete/{id}")
    public Result deleteOrder(@PathVariable("id") Integer id) {
        try {
            boolean isDeleted = orderitemService.deleteOrder(id);
            if (isDeleted) {
                return Result.success("订单删除成功");
            } else {
                return Result.error("订单删除失败，订单不存在或已被删除");
            }
        } catch (Exception e) {
            return Result.error("删除订单失败: " + e.getMessage());
        }
    }

}
