package com.example.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * @author 12209
 * @date 2024/11/28 16:29
 * @className Muen
 */
@Data
@Component
public class Menu {
    private Integer menuid;
    private Integer menucateid;
    private String menuname;
    private String menuimage;
    private String menudetail;
    private String subimages;
    private LocalDateTime createTime; // 创建时间
    private LocalDateTime updateTime; // 更新时间
    private Integer firstid;
    private Integer secondid;
public Menu(Integer menuid,Integer menucateid, String menuname, String menuimage, String menudetail, String subimages, LocalDateTime createTime, LocalDateTime updateTime,Integer firstid,Integer secondid) {
         this.menuid = menuid;
        this.menucateid = menucateid;
        this.menuname = menuname;
        this.menuimage = menuimage;
        this.menudetail = menudetail;
        this.subimages = subimages;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.firstid = firstid;
        this.secondid = secondid;
}
    public Menu() {

    }


}
