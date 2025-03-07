package com.example.controller;/**
 * @author 繁星北斗
 * @CreateDate 2024/11/28
 * @ProjectDetails [<a>]
 */
import com.example.model.Lists;
import com.example.model.Product;
import com.example.model.Result;
import com.example.model.TjianSerachPro;
import com.example.service.ProductService;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 @ClassName 繁星北斗
 @Datetime 2024/11/28 15:27
 */
@Slf4j
@RestController
@RequestMapping("/yigo/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    // 查询导航2id的商品
    @GetMapping("/page")
    public Result page_product(@PathParam("procateid")Integer procateid, @PathParam("pageNum") Integer pageNum, @PathParam("pageSize") Integer pageSize){
        log.info("procateid:"+procateid);
        return Result.success(productService.selectPage_product(procateid,pageNum,pageSize));
    }

    @GetMapping("/{proid}")
    public Result selectById_product(@PathVariable("proid") Integer proid){
        log.info("根据商品id查询商品信息：{}",proid);
        Result res = Result.success(productService.selectById_product(proid));
        System.out.println("Pro_Controller:"+res);
        return Result.success(productService.selectById_product(proid));
    }


    @GetMapping("/getname")
    public Result selectByName_product (@PathParam("proname") String proname){
        log.info("proname:"+proname);
        if (Objects.equals(proname, "") || proname==null)
            return new Result(1,"请输入商品名称",productService.selectPage_product(null,1,10));
        return Result.success(productService.selectByName_product(proname));
    }
    // 根据导航1的id查询全部商品
    @GetMapping("/arrByNav1")
    public Result seletctByNav_1(@PathParam("cateid") Integer cateid, @PathParam("pageNum") Integer pageNum, @PathParam("pageSize") Integer pageSize){
        log.info("cateid:"+cateid+"pageNum:"+pageNum+"pageSize:"+pageSize);

        return Result.success(productService.seletcByNav_1(cateid,pageNum,pageSize));
    }

    @PostMapping("/removeAllByPro")
    public Result removeAllByPro(@RequestBody Lists lists){
        log.info("proidList:"+lists.getUserIdArr());
        productService.removeAllByPro(lists.getUserIdArr());
        return Result.success();
    }


    @PostMapping("/sreach")
    public Result sreach(@RequestBody TjianSerachPro serach){
        List<Product> products = productService.sreach(serach);
        int count = productService.countpro(serach);
        return new Result(1, Integer.toString(count), products);
    }

    @PutMapping("/updatePro")
    public Result updatePro(@RequestBody Product product){
        log.info("product:"+product);
        Product old = productService.selectById_product(product.getProid());
        product.setSubimages(old.getSubimages());
        product.setProdetail(old.getProdetail());
        product.setProname(old.getProname());
        productService.updateById_product(product);
        return Result.success();
    }

    @PostMapping("/addPro")
    public Result addPro(@RequestBody Product product){
        log.info("product:"+product);
        productService.insert_product(product);
        return Result.success();
    }
}
