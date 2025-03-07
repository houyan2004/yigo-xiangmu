package com.example.service;

import com.example.model.Procategory;

import java.util.List;

/**
 * @author 繁星北斗
 * @CreateDate 2024/11/29
 * @ProjectDetails [<a>]
 */
public interface ProcategoryService {
    int add_procategory(Procategory procategory);
    int delete_procategory(Integer cateid);
    Procategory get_procategory(Integer cateid);
    int update_procategory(Procategory procategory);
    List<Procategory> list_procategory(Integer parentid);
}
