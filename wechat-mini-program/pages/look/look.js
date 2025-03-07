// pages/look/look.js
import {getByNameArr,getArrNav1,getArrList} from "../../api/product.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageBash:app.globalData.srcBash,
    historyList:[], //存储用户的搜索历史。
    productList:[//搜索出来的商品
    ],//存储商品列表数据。
    total:1,//
    keyword:'',//存储用户的搜索关键词。
    noData:false//用于标记是否显示“无数据”的状态。如果搜索结果为空或者商品列表为空，这个值会被设置为true，以便在页面上显示相应的提示信息。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 这个地方是防止刷新搜索历史数据丢失
    let searchKeyArr=wx.getStorageSync('searchKeyArr')||null;
    if(searchKeyArr){
      this.setData({
        historyList:searchKeyArr
      })
    }
  },
  // 输入框改变的时候
  onChange(e){
    this.setData({
      keyword:e.detail
    })
  },
  //清空搜索历史
  removeStorageSync(){
    this.setData({
      historyList:[],
      total:0,
      keyword:"",
      productList:[]
    })
    wx.removeStorageSync('searchKeyArr')
  },

  do_serarch_bind(text){ // 点击搜索
    console.log("搜索");
    var temp = this;
    getByNameArr({
      proname:text
    }).then(
      res=>{
        console.log(res);
          temp.setData({
            productList:res.data,
            total:1
          })
      }
    )
  },
  // 确认搜索之后更新历史搜索数组
  onSearch(){
    console.log("搜索1");
    console.log(this.data.keyword);
    this.do_serarch_bind(this.data.keyword);

    let hisArr=this.data.historyList||[];
    hisArr.unshift(this.data.keyword);
    // 去重
    hisArr=[...new Set(hisArr)];
    /*扩展运算符。这个运算符用于将一个数组或其他可迭代对象的所有元素复制到新数组中。因为Set本身不是数组，所以不能直接用在需要数组的地方，通过扩展运算符可以将其转换为数组。 */
    // 这里使最多显示20条搜索历史
    hisArr=hisArr.slice(0,20)
    this.setData({
      historyList:hisArr
    })
    wx.setStorageSync('searchKeyArr', hisArr)
    },
    handleChange: function(e) {
      this.setData({
      currentIndex: e.detail.current
      })
      },


      go_chooseDetail_bind(event){//跳转商品详情页
        const index = event.currentTarget.dataset.event
        console.log(index);
        const proid = this.data.productList[index].proid;
        console.log(this.data.productList[index]);
        wx.navigateTo({
          url: '/pages/chooseDetail/chooseDetail?proid='+proid
        })
    
      },
      select(e){
        var temp = this;
        
        this.setData({
          keyword:e._relatedInfo.anchorTargetText
        })
        
        getByNameArr({
          proname:temp.data.keyword
        }).then(
          res=>{
            console.log(res);
              temp.setData({
                productList:res.data,
                total:1
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
  go_gowuche_bind(event) { //跳转购物车

    const index = event.currentTarget.dataset.event;
    const itemToAdd = this.data.productList[index];
    console.log(this.data.productList[index])
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
  }
})