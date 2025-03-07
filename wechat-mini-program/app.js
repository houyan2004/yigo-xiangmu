// app.js
import {
  loginHttp
} from "api/login.js"
App({
  globalData: {
    jwtToken: null,
    code: null,
    userInfo: null,
    cai_1: 0,
    shang_1: 0,
    srcBash: "https://mp-5f107cca-e226-4561-9211-0386fbee8427.cdn.bspapp.com/yigo", // 图片资源前缀
    flag : 1
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('微信登录接口调用成功');
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);

        this.globalData.code = res.code

        this.goLoginHttp(res.code);
      },
      fail: () => {
        // 微信登录接口调用失败，同样视为登录失败，调用退出小程序的函数
        console.log('微信登录接口调用失败');
        logout();
      }
    })
  },
  goLoginHttp(code) {
    loginHttp({
      code: code
    }).then(res => {
      console.log(res);
      if (res.code === 1) {
        console.log("islogin");
        wx.setStorageSync('jwtToken', res.msg);
        this.globalData.jwtToken = res.msg;
        const data = res.data;
        delete data.openid;

        console.log(wx.env.USER_DATA_PATH);

        let str = data.touxianimg;
        if(str.indexOf("http://tmp")!== -1){
          data.touxianimg = this.globalData.srcBash+"/ljx/images/屏幕截图 2024-10-12 135250.png"
        }
        this.globalData.userInfo = data;
        console.log(this.globalData.userInfo);

        wx.switchTab({
          url: "/pages/index/index"
        })
      } else {
        // 登录失败，调用退出小程序的函数
        console.log('登录失败');
        logout();
      }
    })
  }

})
