package com.example.service;

import com.example.model.Product;
import com.example.model.TjianSerachPro;

import java.util.List;

/**
 * @author 繁星北斗
 * @CreateDate 2024/11/28
 * @ProjectDetails [<a>]
 */
public interface ProductService {
    // 添加商品
    int insert_product(Product product);

    // 根据id查询商品
    Product selectById_product(Integer proid);

    // 根据分类id查询商品
    List<Product> selectByCateId_product(Integer procateid);

    // 查询所有商品
    List<Product> selectAll_product();

    // 根据商品名称查询商品
    List<Product> selectByName_product(String proname);

    //分页查询商品
    List<Product> selectPage_product(Integer procateid,Integer pageMum, Integer pageSize);

    // 修改商品
    int updateById_product(Product product);

    // 根据id删除商品
    int deleteById_product(Integer proid);

    List<Product> seletcByNav_1(Integer cateid, Integer pageNum, Integer pageSize);

    List<Product> sreach(TjianSerachPro serach);

    int countpro(TjianSerachPro serach);

    void removeAllByPro(List<Integer> userIdArr);
}
