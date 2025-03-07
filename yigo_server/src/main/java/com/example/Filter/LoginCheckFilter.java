package com.example.Filter;
import com.alibaba.fastjson.JSON;
import com.example.model.Result;
import com.example.util.JwtUtils;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Slf4j
//@Component
@WebFilter(urlPatterns = "/*")
public class LoginCheckFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("过滤器初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;




        // 1. 获取请求url
        String url = req.getRequestURI();
        log.info("拦截到请求：{}",url);

        if (url.contains("login")||url.contains("zhuce")||url.contains("tEcharts")){// 2. 判断是否是登录请求，如果是，直接放行
            log.info("登录请求，放行...");
            filterChain.doFilter(request,response);
            return;
        }
        String jwt = req.getHeader("token");
        if (!StringUtils.hasLength(jwt)){
            log.info("请求头token为空，返回未登录的信息");
            String notLogin = JSON.toJSONString(new Result(401,"NOT_LOGIN",null));
            resp.getWriter().write(notLogin);
            return;
        }

        // 4. 解析jwt
        try {
            JwtUtils.parseJWT(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("解析jwt失败，返回未登录的信息");
            String notLogin = JSON.toJSONString(new Result(401,"Token illegal",null));
            resp.getWriter().write(notLogin);
            return;
        }
        log.info("令牌合法，放行");
        filterChain.doFilter(request,response);
    }

    @Override
    public void destroy() {
        log.info("过滤器销毁");

    }
}
