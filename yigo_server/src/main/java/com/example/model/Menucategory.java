package com.example.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author 12209
 * @date 2024/12/2 21:05
 * @className Menucategory
 */
@Data
@Component
public class Menucategory {
    private Integer cateid;
    private Integer parentid;
    private String name;
    private Integer status;
    private String shicai;
    protected LocalDateTime createtime;
    protected LocalDateTime updatetime;
    private Integer sonid;
    public Menucategory(Integer cateid,Integer parentid, String name, Integer status, String shicai, LocalDateTime createtime, LocalDateTime updatetime,Integer sonid) {
        this.cateid = cateid;
        this.parentid = parentid;
        this.name = name;
        this.status = status;
        this.shicai = shicai;
        this.createtime = createtime;
        this.updatetime = updatetime;
        this.sonid = sonid;
    }
    public Menucategory(){}


}
