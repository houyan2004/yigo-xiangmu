package com.example.model;/**
 * @author 繁星北斗
 * @CreateDate 2024/11/28
 * @ProjectDetails [<a>]
 */

import lombok.Data;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 @ClassName 繁星北斗
 @Datetime 2024/11/28 9:06
 */
@Data
@Component
public class Product {
    private Integer proid; // 商品id
    private Integer procateid; // 分类id
    private String protitle; // 商品标题
    private String proname; // 商品名称
    private String proimage; // 商品主图
    private String subimages; // 商品轮播图片
    private String[] subimagesArr;
    private String prodetail; // 商品详情
    private String[] prodetailArr;
    private BigDecimal proprice; // 商品价格
    private String prostock; // 商品库存
    private String status; // 商品状态 1.在售 2.下架 3.删除
    private LocalDateTime createTime; // 创建时间
    private LocalDateTime updateTime; // 更新时间

    public Product(Integer procateid, String protitle, String proname, String proimage, String subimages, String prodetail, BigDecimal proprice, String prostock, String status, LocalDateTime updateTime) {
        this.procateid = procateid;
        this.protitle = protitle;
        this.proname = proname;
        this.proimage = proimage;
        this.subimages = subimages;
        this.prodetail = prodetail;
        this.proprice = proprice;
        this.prostock = prostock;
        this.status = status;
        this.updateTime = updateTime;
    }

    public Product() {

    }
}
