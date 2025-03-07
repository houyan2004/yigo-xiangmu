package com.example.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TjianSerachPro {
    private Integer page = 0;
    private Integer pageSize = 0;
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer proid; // 商品id
    private Integer procateid; // 分类id
    private String protitle; // 商品标题
    private String proimage; // 商品主图
    private BigDecimal proprice; // 商品价格
    private String prostock; // 商品库存
    private String status; // 商品状态 1.在售 2.下架 3.删除
}
