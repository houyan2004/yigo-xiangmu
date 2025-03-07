package com.example.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TjianSerach {
   private Integer page = 0;
   private Integer pageSize = 0;
   private LocalDateTime start;
   private LocalDateTime end;
   private Integer id;
   private String username;
   private String phone;
   private String sex;
   private BigDecimal money = BigDecimal.valueOf(0.0);
   private String statut;
}
