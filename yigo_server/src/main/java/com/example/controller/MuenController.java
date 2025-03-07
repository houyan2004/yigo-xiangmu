package com.example.controller;

/**
 * @author 12209
 * @date 2024/11/28 16:28
 * @className MuenMapper
 */

import com.example.model.Menu;
import com.example.model.Result;
import com.example.service.Impl.MenuServicelmpl;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/yigo/muen")
@ResponseBody
@Controller
public class MuenController {
    @Autowired
  private MenuServicelmpl muenServicelmpl;
  @PostMapping("/page")
    public Result select_muen_by_cateid(@PathParam("muencateid") Integer menucateid,@PathParam("offset") Integer offset,@PathParam("limit") Integer limit){
      return Result.success(muenServicelmpl.select_menu_by_cateid(menucateid,offset,limit));
  }
  @GetMapping("/chacaip")
    public Result select_muen_by_name(@PathParam("mununame") String  menuname) {
       log.info("查询菜单名称为{}的菜单",menuname);

      return Result.success(muenServicelmpl.select_menu_by_name(menuname));
  }

//根据id查询菜单
   @GetMapping("/select_muen_id")
    public Result select_muen_by_id(@PathParam("menuid") Integer menuid){
        return Result.success(muenServicelmpl.select_menu(menuid));
   }
    @GetMapping("/selectpage")
    public Result selectPage(Menu menu, @PathParam("pagenum") int pagenum, @PathParam("pagesize") int pagesize) {


        return Result.success(muenServicelmpl.selectPage(menu, pagenum, pagesize));
    }
}
