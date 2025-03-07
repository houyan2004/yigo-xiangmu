// pages/dish_1/dish1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcBash:app.globalData.srcBash,
    swiperList: [
      /* 轮播图 */
      '/hsb/images/dish.png',
      '/hsb/images/dish.png',
      '/hsb/images/dish.png'
    ],
    imageList: [
      '/hsb/images/屏幕截图 2024-11-25 193739.png',
      '/hsb/images/屏幕截图 2024-11-25 193714.png',
      '/hsb/images/屏幕截图 2024-11-25 193550.png'
    ],
    ingredientsList: [{
        image: 'https://img.js.design/assets/img/65ffdc52553a1611219c4da0.png#370d30b0774c922f9b7fd21179f8a2b3',
        foodName: '干辣椒',
        foodprice: '1',
        checked: true
      },
      {
        image: 'https://img.js.design/assets/img/65ffdc14c3a211de156082b8.png#bcb01a88c4de0cd177536c05457f938d',
        foodName: '鸡胸肉',
        foodprice: '20',
        checked: true
      },
      {
        image: 'https://img.js.design/assets/img/666255ad7f6cbc253e5d20bd.png#e35159abadfb9e91452542dd1f13203d',
        foodName: '胡萝卜',
        foodprice: '4.5',
        checked: true
      },
      {
        image: 'https://img.js.design/assets/img/66625602b0b03f7960ff8e1c.png#e2b8794616f5a1a9442711b4fd08658c',
        foodName: '黄瓜',
        foodprice: '4',
        checked: true
      },
      {
        image: 'https://img.js.design/assets/img/66018ef99b80e0787dff3fd6.png#db5a4753e5aa8864726ac4b560d1c713',
        foodName: '花生米',
        foodprice: '9',
        checked: true
      }
    ],
    dishNum: 1 ,//点菜当年数量
    totalPrice: 0,//总价钱


    shareImage: '/hsb/images/分组 2.png',
    detailImage: '/hsb/images/屏幕截图.png',
    swiperCurrent: 0,
    dishPrice: '38.5',
    dishName: '宫保鸡丁',
    buyShow: false, // 控制立即购买弹窗显示的变量
    shareShow: false, //控制分享弹窗显示的变量

    shareTitle: '分享标题',
    shareImageUrl: '/hsb/images/dish.png',
    sharePath: '/pages/dish_1/dish1', // 分享后打开的页面路径


  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  previewImage: function () {
    // 获取传递过来的图片url和图片列表
    const current = this.data.swiperList[0]
    const urls = this.data.swiperList


    // 调用微信小程序的图片预览功能
    wx.previewImage({
      // current: current, // 当前显示图片的http链接
      urls: [
        ''
      ] // 需要预览的图片http链接列表，不能用相对路径
    })

  },
  buyShowPopup() {
    //立即购买弹窗显示
    this.setData({
      buyShow: true
    });
    this.calculatePrice(1);

  },

  buyOnClose() {
    //立即购买弹窗关闭
    this.setData({
      buyShow: false
    });
  },
  shareShowPopup() {
    //分享弹窗显示
    this.setData({
      shareShow: true
    });

  },

  shareOnClose() {
    //分享弹窗关闭
    this.setData({
      shareShow: false
    });
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    wx.shareAppMessage({
      title: this.data.shareTitle,
      imageUrl: this.data.shareImageUrl,
      path: this.data.sharePath,
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
    return {
      title: this.data.shareTitle,
      imageUrl: this.data.shareImageUrl,
      path: this.data.sharePath,
      success(res) {
        console.log('分享成功', res)
      },
      fail(err) {
        console.error('分享失败', err)
      }
    }

  },

  onChange(event) {
    // 获取当前操作的食材索引
    const foodIndex = event.currentTarget.dataset.foodindex;

    // 获取当前食材的选中状态
    const checked = event.detail;

    // 更新 ingredientsList 中对应食材的选中状态
    const ingredientsList = this.data.ingredientsList;
    ingredientsList[foodIndex].checked = checked;
    // 使用 setData 更新页面数据
    this.setData({
      ingredientsList: ingredientsList
    });
    this.calculatePrice(this.data.dishNum);
  },
  onChangeNum(event) {
    // 获取用户输入的数量
    const num = event.detail;
  
    // 更新页面数据中的 dishNum 属性
    this.setData({
      dishNum: num
    });
  
    // 假设你有一个计算价格的函数，可以根据数量更新价格
    this.calculatePrice(num);
  },
  
  calculatePrice(num) {
    // 根据数量计算价格，这里只是一个示例
    let totalIngredientsPrice = 0;
    const ingredientsList = this.data.ingredientsList;

    // 遍历 ingredientsList 数组
    ingredientsList.forEach((ingredient) => {
      // 如果食材被选中，则累加其价格
      if (ingredient.checked) {
        totalIngredientsPrice += parseFloat(ingredient.foodprice);
      }
    });
    const totalPrice = totalIngredientsPrice * num;
    // 更新总价格
    this.setData({
      totalPrice: totalPrice
    });
  },
})