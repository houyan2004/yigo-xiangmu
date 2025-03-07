package com.example.service.Impl;/**
 * @author 繁星北斗
 * @CreateDate 2024/11/29
 * @ProjectDetails [<a>]
 */

import com.example.mapper.ProcategoryMapper;
import com.example.model.Procategory;
import com.example.service.ProcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 @ClassName 繁星北斗
 @Datetime 2024/11/29 11:02
 */
@Service
public class ProcategoryServiceImpl implements ProcategoryService {
    @Autowired
    private ProcategoryMapper procategoryMapper;
    @Override
    public int add_procategory(Procategory procategory) {
        procategory.setCreatetime(LocalDateTime.now());
        procategory.setUpdatetime(LocalDateTime.now());
        return procategoryMapper.add(procategory);
    }

    @Override
    public int delete_procategory(Integer cateid) {
        return procategoryMapper.delete(cateid);
    }

    @Override
    public Procategory get_procategory(Integer cateid) {
        return procategoryMapper.get(cateid);
    }

    @Override
    public int update_procategory(Procategory procategory) {
        procategory.setUpdatetime(LocalDateTime.now());
        return procategoryMapper.update(procategory);
    }

    @Override
    public List<Procategory> list_procategory(Integer parentid) {
        return procategoryMapper.list_byParentid(parentid);
    }
}
