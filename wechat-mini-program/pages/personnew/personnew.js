// pages/personnew/personnew.js
const app = getApp();
import {updateUser} from "../../api/user.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    srcBash: app.globalData.srcBash,
    user: {},
  },

  /**
   * 生命周期函数 - 页面加载相关操作
   */
  onLoad(options) {
    const user = app.globalData.userInfo;
    console.log(user);
    this.setData({
      user: user
    });
  },
  avatar_chijiuhua(tempAvatarPath1){
    const tempAvatarPath = tempAvatarPath1; // 获取用户选择头像的临时路径
    const fileSystemManager = wx.getFileSystemManager();
    const userDataPath = wx.env.USER_DATA_PATH;
    const newAvatarPath = `${userDataPath}/avatar.jpg`; // 定义新的头像保存路径

    // 将临时头像文件复制到 USER_DATA_PATH 下
    fileSystemManager.copyFile({
      srcPath: tempAvatarPath,
      destPath: newAvatarPath,
      success: () => {
        console.log('头像保存成功，路径为:', newAvatarPath);
        // 可以在这里进行后续操作，比如更新页面显示的头像
        const user = this.data.user
        user.touxianimg = newAvatarPath
        this.setData({
          user:user
        })
      },
      fail: (err) => {
        console.error('头像保存失败:', err);
      }
    });

  },
  onChooseAvatar(e){ 
    const {avatarUrl} = e.detail;
    console.log(avatarUrl);
    this.avatar_chijiuhua(avatarUrl);// 图片持久化
    app.globalData.userInfo = this.data.user;
  },

onChangeusername(e){
  const value = e.detail
  console.log();
  let user = this.data.user;
  if(user){
    user.username = value;
    this.setData({
      user:user
    })
    console.log(this.data.user);
    app.globalData.userInfo = this.data.user
  }
},
onChangephone(e){
  const value = e.detail
  console.log();
  let user = this.data.user;
  if(user){
    user.phone = value;
    this.setData({
      user:user
    })
    console.log(this.data.user);
    app.globalData.userInfo = this.data.user
  }
},
  onChangeradio(e){
    const value = e.detail
    console.log(value);
    let user = this.data.user;
    if(user){
      user.sex = value;
      this.setData({
        user:user
      })
      console.log(this.data.user);
      app.globalData.userInfo = this.data.user;
    }
  },
  on_update_bind(){
    console.log("编辑信息");
    updateUser(this.data.user).then(
      res=>{
        console.log(res);
      }
    )
    app.globalData.userInfo = this.data.user;
  },


  /**
   * 生命周期函数 - 页面显示相关操作
   */
  onShow() {
  },

  /**
   * 生命周期函数 - 页面隐藏相关操作
   */
  onHide() {

  },

  /**
   * 生命周期函数 - 页面卸载相关操作
   */
  onUnload() {

  },

  /**
   * 页面交互相关操作 - 用户下拉刷新
   */
  onPullDownRefresh() {

  },

  /**
   * 页面交互相关操作 - 上拉触底
   */
  onReachBottom() {

  },

  /**
   * 页面交互相关操作 - 用户分享功能
   */
  onShareAppMessage() {
    return {
      title: '分享标题示例',
      imageUrl: '分享图片链接示例',
      path: '/pages/index/index'
    };
  }
});