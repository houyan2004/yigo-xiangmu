package com.example.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

public class JwtUtils {

    private static String secretKey = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILjvXqSKGHnBA2y0Nn8hWLY6B7l0ghTKnuK0avQtRBqa Gitee SSH Key";
    private static Long expire = 43200000L;//12小时

    public static String generateJwt(Map<String, Object> claims){
        Date exp = new Date(System.currentTimeMillis() + expire);
        //生成 HMAC 密钥，根据提供的字节数组长度选择适当的 HMAC 算法，并返回相应的 SecretKey 对象。
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder().signWith(key).claims(claims).expiration(exp).compact();
        return jwt;
    }
    public static Claims parseJWT(String jwt){
        //生成 HMAC 密钥，根据提供的字节数组长度选择适当的 HMAC 算法，并返回相应的 SecretKey 对象。
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        // 得到DefaultJwtParser
        JwtParser jwtParser = Jwts.parser().verifyWith(key).build();
        Jws<Claims> jws = jwtParser.parseSignedClaims(jwt);
        Claims claims = jws.getPayload();
        return claims;
    }
}


/*
        上述写法所需依赖
         <!--        JWT令牌-->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.12.6</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.12.6</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId> <!-- or jjwt-gson if Gson is preferred -->
            <version>0.12.6</version>
            <scope>runtime</scope>
        </dependency>
*/
