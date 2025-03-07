// pages/gowuche/gowuche.js
import {
  addOrder
} from '../../api/order.js';
const app = getApp()
const user = app.globalData.userInfo.userid
const URLBash = app.globalData.srcBash
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url_bash:URLBash,
    presrc: app.globalData.srcBash,
    userdata: { //用户信息
      id: user,
      username: "王明",
      phone: "18988297664",
      dizhi: "北京市 东城东区 育新街11号"
    },

    guwu_Arr: [{
        id: 1,
        title: "1袋450ｇ～550ｇ｜本地散叶生菜",
        price: 1.58,
        quantity: 1, // 购买数量
        img: "/hy/image/img/bancai.png"
      },
      {
        id: 1,
        title: "1袋450ｇ～550ｇ｜散叶生菜",
        price: 3.21,
        quantity: 2, // 购买数量
        img: "/hy/image/img/bancai.png"
      },
    ],

    sumPrice: 1.58, // 商品总额
    pesongPirce: 0.00, // 配送费
    toailPirce: 0.00, // 合计
    yixuan: 0, //已选件数
    result: [], // 选中商品索引
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储中读取购物车数据
    let cartItems = wx.getStorageSync('cartItems') || [];
    // 更新页面数据
    this.setData({
      guwu_Arr: cartItems
    });
  },

  go_chooseDetail_bind(enevt){
    const proid = enevt.currentTarget.dataset.id;
    console.log(proid);
    wx.navigateTo({
      url: '/pages/chooseDetail/chooseDetail?proid='+proid,
      success: function(res) {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.log('跳转失败', err);
      },
      complete: function() {
        console.log('跳转完成');
      }
    })
  },


  onChange(enev) { // 选中逻辑
    // 获取选中的商品索引数组
    const checkedItems = enev.detail;
    console.log(checkedItems);

    // 初始化合计价格
    let total = 0;

    // 遍历购物车数组，计算选中商品的总价格
    checkedItems.forEach(index => {
      const item = this.data.guwu_Arr[index];
      total += item.price * item.quantity;
    });

    // 更新页面数据，包括选中商品索引数组和合计价格
    this.setData({
      result: checkedItems,
      yixuan: checkedItems.length,
      toailPirce: total
    });
  },

  // 商品加
  shangping_add_bind(e) {
    const index = e.currentTarget.dataset.event; // 商品列表数组索引
    // 只有当选中商品时才更新商品数量和合计价格
    if (this.data.result.length > 0) {
      this.setData({
        [`guwu_Arr[${index}].quantity`]: this.data.guwu_Arr[index].quantity + 1
      }, () => {
        // 在setData回调中重新计算合计价格
        this.calculateTotalPrice();
      });
    }
  },

  // 商品减
  shangping_reduce_bind(e) {
    const index = e.currentTarget.dataset.event; // 商品列表数组索引
    // 只有当选中商品时才更新商品数量和合计价格
    if (this.data.result.length > 0) {
      if (this.data.guwu_Arr[index].quantity > 1) {
        this.setData({
          [`guwu_Arr[${index}].quantity`]: this.data.guwu_Arr[index].quantity - 1
        }, () => {
          // 在setData回调中重新计算合计价格
          this.calculateTotalPrice();
        });
      }
    }
  },

  // 新增一个方法来计算合计价格
  calculateTotalPrice() {
    console.log(this.data.guwu_Arr);
    let newvalue = this.data.guwu_Arr;
    wx.setStorage({
      key: 'cartItems',
      data: newvalue,
      success: function () {
        console.log('缓存修改成功');
      },
      fail: function () {
        console.log('缓存修改失败');
      },
      complete: function () {
        console.log('缓存修改操作完成');
      }
    });
    let total = 0;
    // 遍历选中的商品索引数组，计算选中商品的总价格
    this.data.result.forEach(index => {
      const item = this.data.guwu_Arr[index];
      total += item.price * item.quantity;
    });
    // 更新合计价格
    this.setData({
      toailPirce: total
    });
  },

  // 支付逻辑
  do_zhifu_bind() {
    const checkedItems = this.data.result;
  
    // 初始化订单数组
    let newOrders = [];

    // 遍历选中的商品，创建订单对象
    checkedItems.forEach(index => {
      const item = this.data.guwu_Arr[index];
      // 创建订单对象
      const order = {
        // createtime: new Date().toISOString(), // 创建时间
        currentunitprice: item.price, // 当前单价
        // id: new Date().getTime(), // 假设订单ID为当前时间戳
        orderid: 2, // 假设订单ID为当前时间戳
        proid: item.id, // 商品ID
        proimage: item.img, // 商品图片
        protitle: item.title, // 商品标题
        quantity: item.quantity, // 商品数量
        status: 1, // 假设订单状态为待付款
        totalprice: item.price * item.quantity, // 总价
        // updatetime: new Date().toISOString(), // 更新时间
        userid: this.data.userdata.id, // 用户ID
      };

      // 调用API添加订单
      addOrder(order).then(response => {
        console.log("订单添加成功", response);
        wx.navigateTo({
          url: '/pages/order/order',
        });
        // 处理成功添加订单后的逻辑，例如跳转到订单详情页面
      }).catch(error => {
        console.error("订单添加失败", error);
        // 处理添加订单失败的情况
      });


      // 将订单对象添加到订单数组中
      // newOrders.push(order);
    });

    // // 将新订单数据存储到本地缓存
    // wx.setStorage({
    //   key: 'newOrders',
    //   data: newOrders,
    //   success: () => {
    //     // 缓存成功后跳转到订单页面
    //     wx.navigateTo({
    //       url: '/pages/order/order',
    //     });
    //   },
    //   fail: () => {
    //     // 处理缓存失败的情况
    //     console.error('缓存订单数据失败');
    //   }
    // });
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
    console.log("onShow");
    app.globalData.gowuche_num = this.data.guwu_Arr.length

    app.globalData.gowuche_num = this.data.guwu_Arr.length
    // 将购物车数据存储到缓存
    wx.setStorage({
      key: 'cartItems',
      data: this.data.guwu_Arr,
      success: function (res) {
        console.log('购物车数据已存储到缓存');
      },
      fail: function (err) {
        console.log('存储购物车数据到缓存失败：', err);
      }
    });
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


})