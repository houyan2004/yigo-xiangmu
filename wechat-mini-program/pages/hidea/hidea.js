// pages/hidea/hidea.js
const app = getApp()
const URLBash = app.globalData.srcBash
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isshow:0,
    title:"",
    neir:"",
  },

  click: function (e) { 
    var index=e.currentTarget.id
    console.log("按了：", e.currentTarget.id)
    this.setData({
      isshow:1,
      title:this.data.list[index].modl,
      neir:this.data.list[index].value
    })
    
  },
  clickout(){
    this.setData({
      isshow:0,
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    var listall=wx.getStorageSync('ideaList');
    console.log("反馈意见");
    console.log(listall);
    this.setData({
      list:listall
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
        
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})