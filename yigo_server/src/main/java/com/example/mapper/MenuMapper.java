package com.example.mapper;

import com.example.model.Menu;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author 12209
 * @date 2024/11/28 16:28
 * @className MuenMapper
 */
@Mapper
public interface MenuMapper {
    List<Menu> selectAll(Menu menu);
    //根据页数和每一页的数量分页查询学生
    @Select("select * from menu limit #{pagenum},#{pagesize}")
    PageInfo<Menu> selectPage(Menu menu,int pagenum, int pagesize);
    //  添加菜谱
    @Insert("insert into menu(menuid,menucateid,menuname,menuimage,menudetail,subimages,createTime,updateTime,firstid,secondid) values(#{menuid},#{menucateid},#{menuname},#{menuimage},#{menudetail},#{subimages},#{createTime},#{updateTime},#{firstid},#{secondid})")
    int insert_menu(Menu menu);
    //根据id删除菜谱
    @Delete("delete from menu where menucateid=#{menucateid}")
    int delete_menu(int menucateid);
   //根据id查询菜谱
    @Select("select * from menu where menucateid=#{menucateid}")
      Menu select_menu(int menucateid);
    //查询所有菜谱
    @Select("select * from menu")
    List<Menu> select_all_menu();
    //修改菜谱
    @Update("update menu set menuname=#{menuname},menuimage=#{menuimage},menudetail=#{menudetail},subimages=#{subimages},createTime=#{createTime} ,updateTime=#{updateTime} where menucateid=#{menucateid}")
    int update_menu(Menu menu);
    //根据菜谱名称查询菜谱
    @Select("select * from menu where menuname like concat('%',#{menuname},'%')")
    List<Menu> select_menu_by_name(String menuname);
//下拉刷新，查询xx类菜谱的第j页x条数据
    List<Menu> select_menu_by_cateid(Integer menucateid, Integer offset, Integer limit);
}
