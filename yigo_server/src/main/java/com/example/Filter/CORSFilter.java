package com.example.Filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@Slf4j
public class CORSFilter extends OncePerRequestFilter {

    @Value("${cors.allow-origin}")
    private String allowOrigin;

    @Value("${cors.allow-methods}")
    private String allowMethods;

    @Value("${cors.allow-headers}")
    private String allowHeaders;

    @Value("${cors.allow-credentials}")
    private boolean allowCredentials;

    @Override
    protected void initFilterBean() {
        log.info("CORSFilter初始化完成");
        log.info("配置参数如下：");
        log.info("allowOrigin:{}",allowOrigin);
        log.info("allowMethods:{}",allowMethods);
        log.info("allowHeaders:{}",allowHeaders);
        log.info("allowCredentials:{}",allowCredentials);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String url = request.getRequestURL().toString();
        String method = request.getMethod();
        log.info("CORSFilter拦截到请求：方法={}, 路径={}", method, url);
        response.addHeader("Access-Control-Allow-Credentials", String.valueOf(allowCredentials));
        response.addHeader("Access-Control-Allow-Origin", allowOrigin);
        response.addHeader("Access-Control-Allow-Methods", allowMethods);
        response.addHeader("Access-Control-Allow-Headers", allowHeaders);

        if ("OPTIONS".equals(request.getMethod())) {
            response.getWriter().println("OK");
            return;
        }

        filterChain.doFilter(request, response);
    }
}