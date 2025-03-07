package com.example.controller;


import com.example.model.NavPro1;
import com.example.model.Procategory;
import com.example.model.Product;
import com.example.model.Result;
import com.example.service.Impl.ProcategoryServiceImpl;
import com.example.service.ProcategoryService;
import com.example.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/yigo")
public class EchartsController {

    @Autowired
    ProcategoryService procategoryService;
    @Autowired
    ProductService productService;
    //一级分类库存统计图
    @GetMapping("/getEcharts")
    public Result getEcharts(){
        List<NavPro1> navPro1s = new ArrayList<>();
        NavPro1 navPro1 = null;
        List<Procategory> procategories = procategoryService.list_procategory(0);
        for (Procategory procategory : procategories) {
            navPro1 = new NavPro1();
            navPro1.setCateid(procategory.getCateid());
            navPro1.setCateName(procategory.getName());
            List<Product> products = productService.seletcByNav_1(navPro1.getCateid(), null, null);
            System.out.println(products);
            int stock = 0;
            for (Product product : products) {
                stock += Integer.parseInt(product.getProstock());
            }
            navPro1.setProstock(stock);
            navPro1s.add(navPro1);
        }
        System.out.println(procategories);
        return Result.success(navPro1s);
    }
}
