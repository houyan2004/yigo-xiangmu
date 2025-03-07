package com.example.mapper;

import com.example.model.Product;
import com.example.model.TjianSerachPro;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author 繁星北斗
 * @CreateDate 2024/11/28
 * @ProjectDetails [<a>]
 */
@Mapper
public interface ProductMapper {
    // 添加商品
    int insert_product(Product product);

    // 根据id查询商品
    @Select("select * from product where proid = #{proid}")
    Product selectById_product(Integer proid);

    // 根据分类id查询商品
    @Select("select * from product where procateid = #{procateid}")
    List<Product> selectByCateId_product(Integer procateid);

    // 查询所有商品
    @Select("select * from product")
    List<Product> selectAll_product();

    //分页查询商品
    List<Product> selectPage_product(Integer procateid,Integer offset, Integer limit);

    // 根据名字查询商品
    @Select("select * from product where proname like concat('%',#{proname},'%')")
    List<Product> selectByName_product(String proname);


    // 修改商品
    @Update("update product set procateid = #{procateid},protitle = #{protitle},proname = #{proname},proimage = #{proimage},subimages = #{subimages},prodetail = #{prodetail},proprice = #{proprice},prostock = #{prostock},status = #{status},updateTime = #{updateTime} where proid = #{proid}")
    int updateById_product(Product product);

    // 根据id删除商品
    @Delete("delete from product where proid = #{proid}")
    int deleteById_product(Integer proid);

    // 根据一级分类id查询全部商品
   // @Select("select * from product where procateid in (select (cateid) from procategory where parentid= #{cateid}) limit #{offset},#{limit}")
    List<Product> seletcByNav_1(Integer cateid, Integer offset, Integer limit);

    // 根据条件查询商品
    List<Product> sreachProduct(Integer offset, Integer limit, LocalDateTime start, LocalDateTime end,
                                       Integer proid, Integer procateid, String protitle, String proimage,
                                       BigDecimal proprice, String prostock, String status);

    int countpro(LocalDateTime start, LocalDateTime end,
              Integer proid, Integer procateid, String protitle, String proimage,
              BigDecimal proprice, String prostock, String status);

    void removeAllByPro(List<Integer> userIdArr);
}
