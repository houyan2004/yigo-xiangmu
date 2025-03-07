package com.example.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author 12209
 * @date 2024/11/29 17:47
 * @className Cart
 */
@Data
@Component
public class Cart {
    private int carid;
    private int userid;
    private int proid;
    private int quantity;
    private int checked;
    private LocalDateTime createtime;
    private LocalDateTime updatetime;

}
