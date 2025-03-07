// pages/detail/detail.js
import { getOrderDetail } from '../../api/order.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presrc: app.globalData.srcBash,
    order_id: 1,// 订单id
    proimage:'/ljx/images/屏幕截图 2024-10-12 135515.png',//商品图片
    title:'商品名称',
    intorduce:'商品介绍',
    jiaqian:100,//s+商品的价钱
    peis:0,//配送fei
    heji:101.0,//商品合计总价
    ding:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    const eventChannel = this.getOpenerEventChannel()

    // 使用箭头函数保留 this 指向，或通过闭包保存 Page 实例
    eventChannel.on('acceptOrder', (data) => {
    
      // 将数据存入 data.ding
      this.setData({ ding: data.data }, () => {
        console.log('确保数据已更新:', this.data.ding);
      });
    })
  },
 
  go_gowuche(){// 跳转购物车

    wx.navigateTo({
      url: '/pages/gowuche/gowuche', 
      data:{
        dingdan_id:this.data.dingdan_id
      }
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

  },
  formatTime(timeStr) {
    console.log("00000000000000000000000")
    if (!timeStr) return '时间未记录';
    // 兼容更多可能的格式
    return timeStr.replace('T', ' ').substr(0, 16);
  }
})