package com.example.util;

import com.google.gson.Gson;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class WeChatLoginVerify {

    // 微信小程序的AppID
    private static final String APPID = "wx869f6036103b415a";
    // 微信小程序的AppSecret
    private static final String APPSECRET = "01644a86e5f1c10bc69b9ca953fd0587";

    public static String[] verifyCode(String code) throws IOException {
        // 构建向微信服务器请求的URL
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + APPID + "&secret=" + APPSECRET + "&js_code=" + code + "&grant_type=authorization_code";

        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);

        CloseableHttpResponse response = httpClient.execute(httpGet);
        try {
            HttpEntity entity = response.getEntity();
            if (entity!= null) {
                // 获取微信服务器返回的JSON数据并转换为字符串
                String result = EntityUtils.toString(entity);
                WeChatUserInfo userInfo = new Gson().fromJson(result,WeChatUserInfo.class);
                System.out.println("微信服务器返回结果: " + result);
                // 这里可以进一步解析返回的JSON数据，提取openid和session_key等信息
                // 例如使用JSON解析库（如Jackson、Gson等）进行解析
                return new String[]{userInfo.getOpenid(),userInfo.getSession_key(),result};
            }
        } finally {
            response.close();
            httpClient.close();
        }
        return null;
    }
}

class WeChatUserInfo {
    private String openid;
    private String session_key;

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getSession_key() {
        return session_key;
    }

    public void setSession_key(String session_key) {
        this.session_key = session_key;
    }

    @Override
    public String toString() {
        return "WeChatUserInfo{" +
                "openid='" + openid + '\'' +
                ", session_key='" + session_key + '\'' +
                '}';
    }
}
