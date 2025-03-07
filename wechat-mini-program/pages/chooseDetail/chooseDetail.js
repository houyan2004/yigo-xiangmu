// pages/chooseDetail/chooseDetail.js
import { getByProid } from "../../api/product.js"
const app = getApp(); // 全局实例
const URLBash = app.globalData.srcBash;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Product_detail_img: ["/hy/image/img/bancaidatli.png", "/hy/image/img/bancaidatli.png", "/hy/image/img/bancaidatli.png"], // 商品详情图
    product_detail_data: { // 商品详情信息
    },
    detail_xingxi: [],
    dishixingxi: "山水乐园", // 配送地址信息
    gowuche_num: 0, // 购物车状况，从全局数据中获取
    show: false, // 地址选择开关
    jianbao_show: false, // 价保开关
    jia_gowu: {
      id: null,
      img: null,
      price: null,
      quantity: null,
      title: null
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.proid);
    options.proid && this.getdetailData(options.proid)
    if(options.proid){
      let num = this.dang_gowuche_num(options.proid);
    console.log("nulm:",num);
    this.setData({
      gowuche_num: num // 购物车状态，全局数据
    })
    }
    let islist = wx.getStorageSync("addressList");
    let dizhi = "请选择地址..."
    console.log(islist);
    if (islist) {
      for (let index = 0; index < islist.length; index++) {
        const e = islist[index];
        if (e.isDefault == true) {
          dizhi = e.city
        }
      }
    }
    console.log(dizhi);
    this.setData({
      dishixingxi: dizhi
    })

  },

  jiarugowuche() { },// 

  getdetailData(proid) {
    const urlBash = app.globalData.srcBash
    console.log(urlBash);
    getByProid(proid).then(res => {
      res.data.proimage = urlBash + res.data.proimage
      if (res.data.subimagesArr) {
        for (let i = 0; i < res.data.subimagesArr.length; i++) {
          res.data.subimagesArr[i] = urlBash + res.data.subimagesArr[i];
        }
      }
      res.data.prodetail = res.data.prodetailArr
      this.setData({
        Product_detail_img: res.data.subimagesArr,
        product_detail_data: res.data
      })
      this.filters(this.data.product_detail_data.prodetailArr)
    })
  },
  filters(textt) {
    const text = textt
    console.log(text);
    let arr = []
    if (text) {
      for (let index = 0; index < text.length; index++) {
        let element = text[index];
        const [key, value] = element.split("|")
        arr = arr.concat({ key, value })
      }
      this.setData({
        detail_xingxi: arr
      })
    }
  },

  on_jiabao() { // 价保开关
    this.setData({ jianbao_show: false })
  },
  jiaoBao_showPopup() { // 价保开关
    this.setData({ jianbao_show: true });
  },
  jianBaoOnClose() { // 价保开关
    this.setData({ jianbao_show: false });
  },

  do_grgwc_bind() { // 加入购物车逻辑

let url = this.data.product_detail_data.proimage;
let startIndex = url.indexOf(URLBash) + URLBash.length;
let result = url.substring(startIndex);
console.log(result); 
let dddd = {
  id:this.data.product_detail_data.proid,
  img:result,
  price:this.data.product_detail_data.proprice,
  quantity:1,
  title:this.data.product_detail_data.protitle
}
console.log(dddd);
    // 获取本地缓存
let value = wx.getStorageSync('cartItems');
console.log(value);
if (value) {
  // 如果存在，修改值
  for(let i = 0;i<value.length;i++){
    if(value[i].id == this.data.product_detail_data.proid){
      value[i].quantity = value[i].quantity + 1;
    }
  }
  wx.setStorageSync('cartItems', value);
  let num = this.dang_gowuche_num(this.data.product_detail_data.proid);
  this.setData({
    gowuche_num:num
  })
} else {
  // 如果不存在，创建缓存
  wx.setStorageSync('cartItems', dddd);
}

  },
  lijigomai_bind() {// 立即购买逻辑
    wx.navigateTo({
      url: '/pages/gowuche/gowuche',
    });
  },

  go_gowuche_bind() { // 跳转购物车页面
    wx.navigateTo({
      url: '/pages/gowuche/gowuche',
    })
  },
  go_index_bind() { // 跳转首页页面
    console.log("index");
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  xuanzedizhi_bind() { // 跳转添加地址页面
    wx.navigateTo({
      url: '/pages/site/site',
    })
  },

  dang_gowuche_num(proid) {// 当前购物车中状态处理
    // 定义一个空数组 data 用于存储从本地存储获取的数据
    let data = [];
    try {
      // 同步从本地存储中获取名为 "cartItems" 的数据
      const res = wx.getStorageSync("cartItems");
      if (res) {
        // 如果获取到了数据，将其赋值给 data 数组
        data = res;
      }
    } catch (error) {
      // 如果获取数据过程中出现错误，在控制台输出错误信息
      console.log("同步获取失败", error);
    }
    // 打印获取到的数据
    console.log(data);
    let num = 0;
    if(data == [])return;
    console.log(proid, data.length);
    for(let i = 0;i<data.length;i++){
      console.log(data[i].id , proid);
      if(data[i].id == proid){ num = data[i].quantity;
        break;
       }
    }
    return num;
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