package com.example.mapper;

import com.example.model.Procategory;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author 繁星北斗
 * @CreateDate 2024/11/29
 * @ProjectDetails [<a>]
 */
@Mapper
public interface ProcategoryMapper {

    @Insert("insert into procategory(parentid,name,createtime,updatetime,img) values(#{parentid},#{name},#{createtime},#{updatetime},#{img})")
    int add(Procategory procategory);


    @Delete("delete from procategory where cateid=#{cateid}")
    int delete(Integer cateid);

    @Update("update procategory set parentid=#{parentid},name=#{name},status=#{status},updatetime=#{updatetime},img=#{img} where cateid=#{cateid}")
    int update(Procategory procategory);

    @Select("select * from procategory where cateid=#{cateid}")
    Procategory get(Integer cateid);

    @Select("select * from procategory where parentid=#{parentid}")
    List<Procategory> list_byParentid(Integer parentid);

}
