package com.example.model;/**
 * @author 繁星北斗
 * @CreateDate 2024/12/23
 * @ProjectDetails [<a>]
 */

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 @ClassName 繁星北斗
 @Datetime 2024/12/23 0:08
 */
@Data
@Component
@Scope("prototype")
public class NavPro1 {
    private Integer cateid;
    private String cateName;
    private Integer prostock;
}
