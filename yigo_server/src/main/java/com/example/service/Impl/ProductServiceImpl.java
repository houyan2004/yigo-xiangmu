package com.example.service.Impl;/**
 * @author 繁星北斗
 * @CreateDate 2024/11/28
 * @ProjectDetails [<a>]
 */

import com.example.mapper.ProductMapper;
import com.example.model.Product;
import com.example.model.TjianSerachPro;
import com.example.service.ProductService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 @ClassName 繁星北斗
 @Datetime 2024/11/28 14:47
 */
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;
    @Override
    public int insert_product(Product product) {
        product.setCreateTime(LocalDateTime.now());
        product.setUpdateTime(LocalDateTime.now());
        return productMapper.insert_product(product);
    }

    @Override
    public Product selectById_product(Integer proid) {
        Product product;
        product = productMapper.selectById_product(proid);
        product.setSubimagesArr(new Gson().fromJson(product.getSubimages(),String[].class));
        product.setProdetailArr(new Gson().fromJson(product.getProdetail(),String[].class));
        System.out.println("service:"+product);
        return product;
    }

    @Override
    public List<Product> selectByCateId_product(Integer procateid) {
        return productMapper.selectByCateId_product(procateid);
    }

    @Override
    public List<Product> selectAll_product() {
        return productMapper.selectAll_product();
    }

    @Override
    public List<Product> selectByName_product(String proname) {
        return productMapper.selectByName_product(proname);
    }

    // 分页
    @Override
    public List<Product> selectPage_product(Integer procateid,Integer pageMum, Integer pageSize) {
        return productMapper.selectPage_product(procateid,(pageMum-1)*pageSize,pageSize);
    }


    @Override
    public int updateById_product(Product product) {
        product.setUpdateTime(LocalDateTime.now());
        return productMapper.updateById_product(product);
    }

    @Override
    public int deleteById_product(Integer proid) {
        return productMapper.deleteById_product(proid);
    }

    @Override
    public List<Product> seletcByNav_1(Integer cateid, Integer pageNum, Integer pageSize) {
        if (pageSize==null) pageSize = 0;
        if (pageNum==null) pageNum = 0;
        return productMapper.seletcByNav_1(cateid,(pageNum-1)*pageSize,pageSize);
    }

    @Override
    public List<Product> sreach(TjianSerachPro serach) {
        return  productMapper.sreachProduct((serach.getPage()-1)*serach.getPageSize(), serach.getPageSize(), serach.getStart(), serach.getEnd(),
                serach.getProid(),serach.getProcateid(),serach.getProtitle(), serach.getProimage(),
                serach.getProprice(), serach.getProstock(), serach.getStatus());
    }

    @Override
    public int countpro(TjianSerachPro serach) {
        return productMapper.countpro(serach.getStart(), serach.getEnd(),
                serach.getProid(),serach.getProcateid(),serach.getProtitle(), serach.getProimage(),
                serach.getProprice(), serach.getProstock(), serach.getStatus());
    }

    @Override
    public void removeAllByPro(List<Integer> userIdArr) {
        productMapper.removeAllByPro(userIdArr);
    }
}
