package com.example.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class Orderitem {
    private Integer orderid;         // 订单id
    private Integer userid;          // 用户表id
    private Integer proid;           // 商品id
    private String protitle;         // 商品名称
    private String proimage;         // 商品图片地址
    private BigDecimal currentunitprice; // 生成订单时的商品单价，单位是元，保留两位小数
    private Integer quantity;        // 商品数量
    private BigDecimal totalprice;   // 商品总价，单位是元，保留两位小数
    private LocalDateTime createtime; // 创建时间
    private LocalDateTime updatetime; // 更新时间
    private Integer id;//id
    private Integer status;//状态



    public Orderitem(Integer orderid, Integer userid, Integer proid, String protitle, String proimage, BigDecimal currentunitprice, Integer quantity, BigDecimal totalprice, LocalDateTime createtime, LocalDateTime updatetime,Integer status) {
        this.orderid = orderid;
        this.userid = userid;
        this.proid = proid;
        this.protitle = protitle;
        this.proimage = proimage;
        this.currentunitprice = currentunitprice;
        this.quantity = quantity;
        this.totalprice = totalprice;
        this.createtime = createtime;
        this.updatetime = updatetime;
        this.status=status;
    }
    public Orderitem() {

    }
}
