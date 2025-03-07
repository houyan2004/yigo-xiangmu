package com.example.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author 12209
 * @date 2024/12/1 21:23
 * @className Shopping
 */
@Data
@Component
public class Shopping {
    private Integer userid;
   private String receivername;
   private String receivermobile;
    private String receiverprovince;
    private String receivercity;
    private String receiverdistrict;
    private String receiveraddress;
    private Integer status;
    private LocalDateTime createtime;
    private LocalDateTime updatetime;
    private Integer shoppingid;



}
