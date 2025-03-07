// pages/ideas/ideas.js
const app = getApp()
 const URLBash = app.globalData.srcBash
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      {
        url: URLBash+'/ljx/images/tit.png',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: URLBash+'/ljx/images/tit.png',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ],
    value1:'',
    title:'',
    max: 520, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,//记录当前字数
    sztp:'https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/ljx/images/t01364c059d6057a5b0.jpg',//添加图片的那个图片
    newideaList:[],
    ideas:{
      modl:"",
      content:"",
    },
  },
   
  //字数限制  
  inputs: function (e) {
    
    // 获取输入框的内容
    this.data.ideas.value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(this.data.ideas.value.length);
    console.log(len)
    //最少字数限制
   

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

    console.log(this.data)
  },
 select(e){
   console.log(e);
   this.setData({
     value1:e.target.dataset.value,
   })
  
 },
 tijiao() {
   console.log("提交了吗")
  var ideas = this.data.ideas;
  var newideaList = wx.getStorageSync('ideaList')
  
  // 确保属性名正确
  this.data.ideas.modl = this.data.value1; // 假设正确的属性名是 model
  
  // 合并数组
  newideaList = [ideas, ...newideaList];
  
  // 存储到本地缓存
  wx.setStorage({
    key: 'ideaList', // 正确的 key 名称
    data: newideaList,
    success: function() {
      wx.showToast({
        title: '提交成功',
        icon: 'success', // 正确的图标名称
        duration: 2000 // 可以设置显示时长，默认2000ms
      });
    },
    fail: function() {
      wx.showToast({
        title: '存储失败',
        icon: 'none'
      });
    }
  });
  
  // 延时返回上一页
  setTimeout(() => {
    wx.navigateBack({
      delta: 0,
    });
  }, 2000); // 延时2秒后返回，确保提示信息显示完毕
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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