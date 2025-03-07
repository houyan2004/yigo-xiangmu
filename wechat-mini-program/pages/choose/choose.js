// pages/choose/choose.js
import {
  getByNameArr,
  getArrNav1,
  getArrList
} from "../../api/product.js"
import {
  getNav_1
} from "../../api/Procategory.js"
const app = getApp()
const URLBash = app.globalData.srcBash
var pageNum = 1
var pageSize = 10

Page({
  /**
   * 页面的初始数据
   */
  data: {

    url_bash:URLBash,
    search_text: "",
    active_index: 0,
    isNavZhanKai: false,
    nav_1: [{
      cateid: 1,
      name: "蔬菜豆品",
      img: "/hy/image/img/002.png"
    },
    {
      cateid: 3,
      name: "肉禽蛋",
      img: "/hy/image/img/002.png"
    },
    {
      cateid: 4,
      name: "料酒调味",
      img: "/hy/image/img/002.png"
    },
    {
      cateid: 5,
      name: "冻品面点",
      img: "/hy/image/img/002.png"
    },
    {
      cateid: 6,
      name: "水产海鲜",
      img: "/hy/image/img/002.png"
    }, 
    {
      cateid: 7,
      name: "水果鲜花",
      img: "/hy/image/img/002.png"
    }, ], // 一级分类数据
    nav_2: [{
      cateid: -1,
      name: "全部"
    }, ], // 二级分类数据

    nav_3: ["综合", "销量", "价格"],

    arrData: [], // 列表数据

    nav1_index: 0, // 一级分类默认索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var yemathis = this
    async function getData() {
      await getNav_1({
        parentid: 0
      }).then(res => {
        let imgBash = app.globalData.srcBash
        res.data.forEach(e => { // 处理图片地址前缀
          e.img = imgBash + e.img
        })
        yemathis.setData({
          nav_1: res.data
        })
      })
      if(app.globalData.flag==1){
        app.globalData.flag = 0;
      await getNav_1({
        parentid: yemathis.data.nav_1[0].cateid
      }).then(res => {
        const arrnav = [...[{
          cateid: -1,
          name: "全部"
        }], ...res.data]
        yemathis.setData({
          nav_2: arrnav
        })
        yemathis.selectComponent('#tabs').resize();
      })


      await getArrNav1({
        cateid: yemathis.data.nav_1[yemathis.data.nav1_index].cateid,
        pageNum: pageNum,
        pageSize: pageSize
      }).then(res => {
        let imgBash = app.globalData.srcBash
        res.data.subimages && res.data.forEach(e => {
          e.proimage = imgBash + e.proimage
          e.subimages.forEach(ee => {
            ee.img = imgBash + ee.img
          })
        })
        yemathis.setData({
          arrData: res.data
        })
      })
    }
    }
      getData()
  },

  input_focus(){
    console.log("input_focus");
    wx.navigateTo({
      url: '/pages/look/look',
    })
  },

  zhangkai_bind() {
    this.setData({
      isNavZhanKai: true
    })
  },
  shouqi_bind() {
    this.setData({
      isNavZhanKai: false
    })
  },


  go_chooseDetail_bind(event) { //跳转商品详情页
    const index = event.currentTarget.dataset.event
    const proid = this.data.arrData[index].proid;
    console.log(this.data.arrData[index]);
    wx.navigateTo({
      url: '/pages/chooseDetail/chooseDetail?proid=' + proid
    })

  },

  go_gowuche_bind(event) { //跳转购物车

    const index = event.currentTarget.dataset.event;
    const itemToAdd = this.data.arrData[index];

    // 创建一个新的商品对象，结构与 guwu_Arr 中的对象相同
    const newItem = {
      id: itemToAdd.proid, // 假设每个商品有一个唯一的 id
      title: itemToAdd.protitle,
      price: itemToAdd.proprice,
      quantity: 1, // 初始数量设为 1
      img: itemToAdd.proimage
    };

  // 获取当前购物车数据，确保 guwu_Arr 已经在 data 中定义
  let cartItems = this.data.guwu_Arr || []; // 如果 guwu_Arr 未定义，则初始化为空数组

    // 将新商品添加到购物车数组中
    cartItems.push(newItem);
    // 更新页面数据
    this.setData({
      guwu_Arr: cartItems
    }, () => {
      // 在 setData 的回调函数中保存购物车数据并跳转页面
      wx.setStorageSync('cartItems', cartItems);
      wx.navigateTo({
        url: '/pages/gowuche/gowuche',
      });
    });
  },

  onClick_nav1_fn(index){
    this.setData({
      nav1_index: index
    })
    console.log(this.data.nav_1[index].cateid);
    getNav_1({
      parentid: this.data.nav_1[index].cateid
    }).then(res => {
      const arrnav = [...[{
        cateid: -1,
        name: "全部"
      }], ...res.data]
      console.log(arrnav);
      this.setData({
        nav_2: arrnav,
        active_index: 0
      })
      console.log(arrnav);
      console.log(this.data.nav_2);
      this.selectComponent('#tabs').resize();

      getArrNav1({
        cateid: this.data.nav_1[this.data.nav1_index].cateid,
        pageNum: pageNum,
        pageSize: pageSize
      }).then(res => {
        let imgBash = app.globalData.srcBash
        res.data.subimages && res.data.forEach(e => {
          e.proimage = imgBash + e.proimage
          e.subimages.forEach(ee => {
            ee.img = imgBash + ee.img
          })
        })
        this.setData({
          arrData: res.data
        })
      })

    })
  },
  onClick_nav1(event) { // 点击一级分类
    console.log(event.currentTarget.dataset.even);
    const index = event.currentTarget.dataset.even
    this.onClick_nav1_fn(index);
  },
  onClick_nav2(event) { //点击二级分类
    const index = event.detail.name
    const id = this.data.nav_2[event.detail.name].cateid;
    this.setData({
      active_index: index
    })

    if (index === 0) { // 点击全部
      getArrNav1({
        cateid: this.data.nav_1[this.data.nav1_index].cateid,
        pageNum: pageNum,
        pageSize: pageSize
      }).then(res => {
        let imgBash = app.globalData.srcBash
        res.data.subimages && res.data.forEach(e => {
          e.proimage = imgBash + e.proimage
          e.subimages.forEach(ee => {
            ee.img = imgBash + ee.img
          })
        })
        this.setData({
          arrData: res.data
        })
      })
    } else {
      this.getNav2Arr(id, pageNum, pageSize)
    }
  },

  getNav2Arr(procateid, pageNum, pageSize) {
    getArrList({
      procateid,
      pageNum:pageNum,
      pageSize:pageSize
    }).then(res =>{
        let imgBash= app.globalData.srcBash
        res.data.subimages && res.data.forEach(e =>{
          e.proimage = imgBash + e.proimage
          e.subimages.forEach(ee =>{
            ee.img = imgBash + ee.img
          })
        })
        this.setData({
          arrData:res.data
        })
    })
  },

  onClick_nav3(event) { // 点击三级分类
    const index = event.detail.name
  },


  goSearch(even) { // 搜索框实时焦点事件
    this.setData({
      search_text: even.detail.value
    })
  },

  do_serarch_bind() { // 点击搜索
    getByNameArr({
      proname: this.data.search_text
    }).then(
      res => {
        this.setData({
          arrData: res.data
        })
      }
    )
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
    let index = app.globalData.shang_1
    console.log("index：" + index);
    this.onClick_nav1_fn(index);
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

  }
})