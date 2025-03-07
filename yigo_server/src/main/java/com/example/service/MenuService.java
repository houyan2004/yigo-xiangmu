package com.example.service;

import com.example.model.Menu;
import com.github.pagehelper.PageInfo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;

/**
 * @author 12209
 * @date 2024/11/28 16:29
 * @className MuenService
 */
@Transactional
public interface MenuService {
//    添加 菜谱
    int insert_menu(Menu menu);
    //    删除 菜谱
    int delete_menu(int menucateid);
    //   根据id查询 菜谱
    Menu select_menu(int menucateid);
//    查询所有 菜谱
     List<Menu> select_all_menu();
    //    修改 菜谱
    int update_menu(Menu menu);
//    根据名字查询 菜谱
    List<Menu> select_menu_by_name(String menuname);
//       根据分类查询 菜谱
    List<Menu> select_menu_by_cateid(Integer menucateid, Integer offset, Integer limit);
    PageInfo<Menu> selectPage(Menu menu, Integer pagenum, Integer pagesize);
}
