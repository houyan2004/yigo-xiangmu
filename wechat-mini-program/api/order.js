import { request } from "../utils/request.js";

// 获取订单详情
export function getOrderDetail(orderId) {
  console.log("getOrderDetail: " + orderId);
  return request({
    url: "/yigo/order/detail/"+orderId,
    method: "GET"
  });
}


// 获取订单详情通过用户ID和订单ID
export function getOrderDetailByUser(userId, orderId) {
  console.log("getOrderDetailByUser: userId=" + userId + ", orderId=" + orderId);
  return request({
    url: "/yigo/order/orderByUser",
    method: "POST",
    data: {
      userId: userId,
      orderId: orderId
    }
  });
}



export function getOrderList(userId) {
  console.log("getOrderDetail: " + userId);
  return request({
    url: "/yigo/order/getListOrder/"+userId,
    method: "GET"
  });
}

//添加订单
export function addOrder(orderData) {
  console.log("addOrder: ", orderData);
  return request({
    url: "/yigo/order/add", // 假设这是添加订单的API路径
    method: "POST",
    data: orderData
  });
}


// 删除订单
export function deleteOrder(id) {
  console.log("deleteOrder: ", id);
  return request({
    url: "/yigo/order/delete/"+id,
    method: "DELETE"
  });
}