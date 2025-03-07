package com.example.mapper;

import com.example.model.Menucategory;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @author 12209
 * @date 2024/12/3 9:44
 * @className MenucategoryMapper
 */
@Mapper
public interface MenucategoryMapper {
    @Select("select * from menucategory where sonid = #{sonid} and parentid =#{parentid}")
      Menucategory all_list(Integer sonid,Integer parentid);

   @Insert("insert into menucategory (cateid,parentid,name,status,shicai,createtime,updatetime,sonid) values (#{cateid},#{parentid},#{name},#{status},#{shicai},#{createtime},#{updatetime},#{sonid})")
   int add_menucategory(Menucategory menucategory);
}
