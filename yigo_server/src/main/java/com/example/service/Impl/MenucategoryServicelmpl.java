package com.example.service.Impl;

import com.example.mapper.MenucategoryMapper;
import com.example.model.Menucategory;
import com.example.service.MenucategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 12209
 * @date 2024/12/3 9:59
 * @className MenucategoryServiceimpl
 */
@Service
public class MenucategoryServicelmpl implements MenucategoryService {
    @Autowired
    private MenucategoryMapper menucategoryMapper;
    @Override
    public Menucategory all_list(Integer sonid, Integer parentid){
        return menucategoryMapper.all_list(sonid,parentid);
    }
}