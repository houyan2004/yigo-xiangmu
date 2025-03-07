package com.example.service.Impl;
import com.example.mapper.MenuMapper;
import com.example.model.Menu;
import com.example.service.MenuService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 12209
 * @date 2024/11/28 16:29
 * @className MuenServicelmpl
 */
@Service
public class MenuServicelmpl implements MenuService {
   @Autowired
    private MenuMapper menuMapper;
    @Override
    public int insert_menu(Menu menu) {
        return menuMapper.insert_menu(menu);
    }
    @Override
    public int delete_menu(int id) {
        return menuMapper.delete_menu(id);
    }
    @Override
   public Menu select_menu(int menucateid ){
       return menuMapper.select_menu(menucateid);
    }
    @Override
   public  List<Menu> select_all_menu(){
        return menuMapper.select_all_menu();
    }
    @Override
   public int update_menu(Menu menu){
        return menuMapper.update_menu(menu);
    }
    @Override
    public List<Menu> select_menu_by_name(String  menuname){

        return menuMapper.select_menu_by_name(menuname);


    }
    @Override
    public   List<Menu> select_menu_by_cateid(Integer menucateid, Integer offset, Integer limit){

        return menuMapper.select_menu_by_cateid(menucateid,offset,limit);
    }
    @Override
    public PageInfo<Menu> selectPage(Menu menu, Integer pagenum, Integer pagesize){
        PageHelper.startPage(pagenum,pagesize);
        List<Menu> list=menuMapper.selectAll(menu);
        return  PageInfo.of(list);
    }

}
