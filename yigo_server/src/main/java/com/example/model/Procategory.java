package com.example.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Procategory {
    private Integer cateid;
    private Integer parentid;
    private String name;
    private Integer status;
    private LocalDateTime createtime;
    private LocalDateTime updatetime;
    private String img;

    public Procategory(Integer parentid, String name) {
        this.parentid = parentid;
        this.name = name;
    }
}
