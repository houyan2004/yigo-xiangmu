 const app = getApp()
 const URLBash = app.globalData.srcBash
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //我的页面那个商品推荐列表
    url_bash:URLBash,
    
     productList:[//推荐商品
      {
        proid:1,
        title:"1袋450ｇ～550ｇ｜本地散叶生菜",
        price:0.58,
        xiangqing:[],
        imgurl:"/hy/image/img/bancai.png"
      },
      {
        proid:2,
        title:"辣新鲜芋艿",
        price:5,
        xiangqing:[],
        imgurl:"/hy/image/img/yutou.png"
      },
      {
        proid:3,
        title:"1袋450ｇ～550ｇ｜ 新鲜五花肉",
        price:10.00,
        xiangqing:[],
        imgurl:"/hy/image/img/wuhuarou.png"
      },
      {
        proid:4,
        title:"1袋450ｇ～550ｇ｜ 奶油面包",
        price:2.58,
        xiangqing:[],
        imgurl:"/hy/image/img/mianbao.png"
      },
      
    ],
    arrData: [], // 初始化 arrData
    guwu_Arr: [],// 初始化 guwu_Arr
       title:app.globalData.userInfo.username||'哈利.波特',//用户名字
       phone:app.globalData.userInfo.phone||'53214654551',//用户电话号码
      hint:app.globalData.userInfo.touxianimg,//用户头像
       shezhi:URLBash+'/ljx/images/设置.png',//设置标识图片
      vip:URLBash+'/ljx/images/屏幕截图 2024-10-13 221213_美图抠图20241013.png',//头像下面那个vip图片
      tit:URLBash+'/ljx/images/tit.png',//为你推荐那个图片
      item:0,
      
  },
  changepage(e){
    const index = e.currentTarget.dataset.item
    console.log(index);
    wx.navigateTo({
      url: '/pages/order/order?index='+ index
       
    })
  },
  handleChange: function(e) {
    this.setData({
    currentIndex: e.detail.current
    })
    },
    go_chooseDetail_bind(event){//跳转商品详情页
      const index = event.currentTarget.dataset.event
      console.log(index);
      wx.navigateTo({
        url: '/pages/chooseDetail/chooseDetail?proid=' + "1",
      })
  
    },
   
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  go_gowuche_bind(e) { // 跳转购物车
    console.log(e);
    const index = e.currentTarget.dataset.event; // 获取点击的商品索引
    const itemToAdd = this.data.productList[index]; // 从 productList 中获取商品信息
  
    // 创建一个新的商品对象，结构与 guwu_Arr 中的对象相同
    const newItem = {
      id: itemToAdd.proid, // 商品 ID
      title: itemToAdd.title, // 商品标题
      price: itemToAdd.price, // 商品价格
      quantity: 1, // 初始数量设为 1
      img: itemToAdd.imgurl // 商品图片
    };
  
    // 获取当前购物车数据，确保 guwu_Arr 已经在 data 中定义
    let cartItems = this.data.guwu_Arr || []; // 如果 guwu_Arr 未定义，则初始化为空数组
  
    // 检查购物车中是否已存在该商品
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      // 如果商品已存在，增加数量
      existingItem.quantity += 1;
    } else {
      // 如果商品不存在，添加到购物车
      cartItems.push(newItem);
    }
  
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.userInfo);
    this.setData({
    title:app.globalData.userInfo.username,//用户名字
    phone:app.globalData.userInfo.phone,//用户电话号码
   hint:app.globalData.userInfo.touxianimg,//用户头像
  })
  },
  handleImageLoad: function() {
    console.log('图片加载成功');
    // 在这里可以进行图片加载成功后的操作，比如显示提示信息等
  },
  handleImageError: function() {
    console.log('图片加载失败');
    this.setData({
      hint:"https://mp-5f107cca-e226-4561-9211-0386fbee8427.cdn.bspapp.com/yigo/hy/image/img/touxiangxiang.jpg"
    })
    app.globalData.userInfo.touxianimg = this.data.hint;
    // 在这里可以进行图片加载失败后的操作，比如显示默认图片或提示信息等
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})