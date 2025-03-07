// pages/dish/dish.js
import {getByNameArr} from "../../api/menu"
const app = getApp()
const URLBash = app.globalData.srcBash
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url_bash:URLBash,
    search_text:'',
    menuname:'',
    productList:[]
  },
  goSearch(even) { // 搜索框实时焦点事件
    console.log("到底有没有触发方法啊");
    console.log(even.detail.value);
    this.setData({
      search_text: even.detail.value
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
  wx.removeStorageSync('searchKeyArr1')
},
  do_serarch_bind(){ // 点击搜索
    console.log(this.data.search_text);
    getByNameArr({
      menuname:this.data.search_text
    }).then(
      res=>{
        console.log(res);
        this.setData({
          productList:res.data
        })
      }
      
    )
    let hisArr=this.data.historyList||[];
    hisArr.unshift(this.data.search_text);
    // 去重
    hisArr=[...new Set(hisArr)];
    /*扩展运算符。这个运算符用于将一个数组或其他可迭代对象的所有元素复制到新数组中。因为Set本身不是数组，所以不能直接用在需要数组的地方，通过扩展运算符可以将其转换为数组。 */
    // 这里使最多显示20条搜索历史
    hisArr=hisArr.slice(0,20)
    this.setData({
      historyList:hisArr
    })
    wx.setStorageSync('searchKeyArr1', hisArr)
  },
  select(e){
    console.log("选中搜索记录了吗")
    var temp = this;
    
    this.setData({
      search_text:e._relatedInfo.anchorTargetText
    })
    
    getByNameArr({
      menuname:temp.data.search_text
    }).then(
      res=>{
        console.log(res);
          temp.setData({
            productList:res.data
            
          })
      }
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search_text:""
    })
    let searchKeyArr=wx.getStorageSync('searchKeyArr1')||null;
    if(searchKeyArr){
      this.setData({
        historyList:searchKeyArr
      })
    }
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
    src:"https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/ljx/images/szy.jpg"
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
  
})