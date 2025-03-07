// index.js
const app = getApp()
const URLBash = app.globalData.srcBash
Page({
  data: {
    url_bash:URLBash,
    currentIndex: 0,
    srcBash:app.globalData.srcBash,
    // 这是那个八大菜系，素食主义选择的数组
    classifylist:[
      {
        name:'八大菜系',
        src:'/ljx/images/t011e5b465b9c77bbab.jpg',
        id:0,
        url:''
      },
      {
        name:'健康养生',
        src:'/ljx/images/t0150b1948d97bca001.jpg',
        id:1,
        url:''
      },
      {
        name:'烘焙菜谱',
        src:'/ljx/images/t011ca78838a2af9855.png',
        id:2,
        url:''
      },
       
      {
        name:'西式菜谱',
        src:'/ljx/images/t011ca78838a2af9855.png',
        id:3,
        url:''
      },
    ],
    // 八大菜系下面那个食材分类选择的数组
    foodlist:[
      {
        name:'蔬菜豆品',
        src:'/ljx/images/屏幕截图 2024-10-12 135515.png',
        id:0,
        url:''
      },
      {
        name:'肉禽蛋',
        src:'/ljx/images/屏幕截图 2024-10-12 135250.png',
        id:1,
        url:''
      },
      {
        name:'料油调味',
        src:'/ljx/images/t01eb60c84d35e3a000.png',
        id:2,
        url:''
      },
      {
        name:'冻品面点',
        src:'/ljx/images/屏幕截图 2024-10-12 135250.png',
        id:3,
        url:''
      },
      {
        name:'水产海鲜',
        src:'/ljx/images/t01452cc0264b800380.jpg',
        id:4,
        url:''
      },
      {
        name:'水果鲜花',
        src:'/ljx/images/true.jpg',
        id:5,
        url:''
      },

    ],
    productList:[//推荐的商品
      {
        id:0,
        title:"1袋450ｇ～550ｇ｜本地散叶生菜",
        price:0.50,
        xiangqing:[],
        imgurl:"/hy/image/img/bancai.png"
      },
      {
        id:1,
        title:"1袋450ｇ～550ｇ｜本地新鲜鸡腿",
        price:2.00,
        xiangqing:[],
        imgurl:"/hy/image/img/jikuai.png"
      },
      {
        id:2,
        title:"1袋450ｇ～550ｇ｜ 新鲜五花肉",
        price:10.00,
        xiangqing:[],
        imgurl:"/hy/image/img/wuhuarou.png"
      },
      {
        id:3,
        title:"1袋450ｇ～550ｇ｜ 奶油面包",
        price:2.58,
        xiangqing:[],
        imgurl:"/hy/image/img/mianbao.png"
      },
    ],
    // 轮播图数组
    lunbolist:[
      {
        id:1,
        src:'/ljx/images/84edc120cb4083d0a18d2bd95e6a541288badc4645481d-hUaVDu_fw658webp.webp',

      },
      {
        id:2,
        src:'/ljx/images/t01120ffed49637ef1a.jpg',

      },
      {
        id:3,
        src:'/ljx/images/t01120ffed49637ef1a.jpg',
      },
    ],
    arrData: [{
      proid: 1,
      protitle: "1袋450ｇ～550ｇ｜本地散叶生菜",
      proprice: 1.58,
      prodetail: [],
      prostock: 100,
      proimage: "/hy/image/img/bancai.png"
    }, 
    {
      proid: 2,
      protitle: "1袋450ｇ～550ｇ｜本地散叶生菜",
      proprice: 1.58,
      prodetail: [],
      prostock: 100,
      proimage: "/hy/image/img/bancai.png"
    },
    {
      proid: 3,
      protitle: "1袋450ｇ～550ｇ｜本地散叶生菜",
      proprice: 1.58,
      prodetail: [],
      prostock: 100,
      proimage: "/hy/image/img/bancai.png"
    },
    {
      proid: 4,
      protitle: "1袋450ｇ～550ｇ｜本地散叶生菜",
      proprice: 1.58,
      prodetail: [],
      prostock: 100,
      proimage: "/hy/image/img/bancai.png"
    },],
    
  },
   
   
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  redirecty(e){
    const shanping_title = e.currentTarget.dataset.title
    console.log(shanping_title);
    app.globalData.shang_1 = shanping_title
    wx.switchTab({
      url: '/pages/choose/choose?title='+shanping_title 
    })
  },
  handleChange: function(e) {
    this.setData({
    currentIndex: e.detail.current
    })
    },
    go_chooseDetail_bind(event) { //跳转商品详情页
      const index = event.currentTarget.dataset.event
      console.log(index);
      const proid = this.data.arrData[index].proid;
      console.log(this.data.arrData[index]);
      wx.navigateTo({
        url: '/pages/chooseDetail/chooseDetail?proid=' + proid
      })
  
    },
    select1(e){
      let index = e.currentTarget.dataset.index;
      console.log(index);
      app.globalData.shang_1 = index;
      app.globalData.flag = 0;
      wx.reLaunch({
        url: `/pages/choose/choose`,
        });
    },
    select2(e) {
      console.log("菜谱传值");
      console.log(e.currentTarget.dataset.title);
      wx.reLaunch({
        url: `/pages/recipe/recipe?zhi=${e.currentTarget.dataset.title}`,
      });
    }
})
