// pages/order/order.js
import {
  getOrderList,
  deleteOrder
} from '../../api/order.js';
const app = getApp()
const user = app.globalData.userInfo.userid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presrc: app.globalData.srcBash,
    active: 0, //这是商品标签页的激活标签
    item: 0, //这是本地缓存里面的那个数据名称，实现标签跳转
    //商品列表（全部）
    orderlist: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("列表所携带的值", options.index)
    this.setData({
      active: options.index
    })
    
    this.getOrserList(); // 页面加载时获取订单列表
    
    // this.getOrserList2()


  },
  // 从服务器获取订单列表
  getOrserList() {
    getOrderList(user).then(response => {
      
      console.log(response.data)
      console.log("11111111111111111111111111")
      // 假设后端返回的数据结构是 { code: 1, data: [{订单对象}, ...] }
      if (response.code === 1) { // 成功响应
        this.setData({
          orderlist: response.data // 设置订单列表数据
        });
        // console.log(orderlist)
      }
    }).catch(error => {
      console.error('获取订单列表详情失败:', error);
      // 这里可以处理错误，例如显示错误信息
    });
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
    // 从缓存中读取新订单数据
    // wx.getStorage({
    //   key: 'newOrders',
    //   success: (res) => {
    //     // 将新订单数据添加到订单列表中
    //     this.setData({
    //       orderlist: [...this.data.orderlist, ...res.data]
    //     });
    //     // 读取成功后，可以删除缓存中的新订单数据
    //     wx.removeStorage({
    //       key: 'newOrders',
    //       success: () => {
    //         console.log('新订单数据已添加到订单列表，并从缓存中删除');
    //       }
    //     });
    //   },
    //   fail: () => {
    //     // 处理读取缓存失败的情况
    //     console.error('读取新订单数据失败');
    //   }
    // });
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









  // 删除订单
  tap_deleteOrder(e) {
    const index = e.currentTarget.dataset.index; // 获取到要删除的订单的index
    console.log(this.data.orderlist[index].id)
    deleteOrder(this.data.orderlist[index].id).then(response => {

      if (response.code === 1) { // 成功响应
        console.log("0000000000111111111111")
        // 更新页面数据
        this.getOrserList();
      }
    }).catch(error => {
      console.error('删除订单失败:', error);
      // 这里可以处理错误，例如显示错误信息
    });

  },

  // 订单详情
  orderdetail(e) {
    const index = e.currentTarget.dataset.index; // 获取点击订单的索引
    const my_order = this.data.orderlist[index]; // 获取订单
    console.log(this.data.orderlist[index].id)
    wx.navigateTo({
      url: "/pages/detail/detail"/*+"?id="+this.data.orderlist[index].id*/, 
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptOrder', {
          data: my_order
        })
      }
    });
  },



})