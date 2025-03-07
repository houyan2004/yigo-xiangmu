// pages/recipe/recipe.js
import {getNav_1} from "../../api/menuprory.js"
import {getByNameArr,getByid,getall} from "../../api/menu.js"
const app = getApp()
 const URLBash = app.globalData.srcBash
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url_bash:URLBash,
    search_value:"",
    search_text:"",
    value:"",
    zongd:[],
    total:0,
    init:[
       {
        yiji:0,
        erji:1
       }
    ],
    yijifenlei: [//一级分类
      { name: '八大菜系' ,url:URLBash+'/hsb/images/八大菜系.png' ,id:3
    },
      { name: '健康养生' ,url:URLBash+'/hsb/images/八大菜系.png',id:9 },
      { name: '烘焙菜谱' ,url:URLBash+'/hsb/images/八大菜系.png',id:5 },
      { name: '西式菜谱' ,url:URLBash+'/hsb/images/八大菜系.png',id:1 },
      { name: '素食主义' ,url:URLBash+'/hsb/images/八大菜系.png',id:7 },
      { name: '汤食粥品' ,url:URLBash+'/hsb/images/八大菜系.png',id:8 },
      { name: '节目菜谱' ,url:URLBash+'/hsb/images/八大菜系.png',id:12 },
      { name: '其他菜系' ,url:URLBash+'/hsb/images/八大菜系.png',id:7 }
    ],
    pagenum:1,
    pagesize:10,
    nav_2:[],
    
    erjifenl:[
      {name:"川菜",id:3},
      {name:"粤菜",id:2}, 
      {name:"鲁菜",id:1},
      {name:"苏菜",id:7}, 
      {name:"浙菜",id:6}, 
      {name:"徽菜",id:5},
      {name:"湘菜",id:8},
    ], 
    erjifenl0:[
      {name:"川菜",id:3},
      {name:"粤菜",id:2}, 
      {name:"鲁菜",id:1},
      {name:"苏菜",id:7}, 
      {name:"浙菜",id:6}, 
      {name:"徽菜",id:5},
      {name:"湘菜",id:8},
    ],
     // 二级分类
      erjifenl1:[
        {name:"粥食",id:3},
        {name:"药膳",id:2}, 
        {name:"低脂",id:1},
        {name:"少糖",id:7}, 
        {name:"少盐",id:6}, 
        {name:"低碳",id:5},
        {name:"沙拉",id:8},],
        erjifenl2:[
          {name:"蛋糕",id:3},
          {name:"茶点",id:2}, 
          {name:"油炸",id:1},
          {name:"面包",id:7}, 
          {name:"早餐",id:6}, 
          {name:"西式",id:5},
          {name:"中式",id:8},],
          erjifenl3:[
            {name:"轻食",id:3},
            {name:"蔬菜",id:2}, 
            {name:"肉类",id:1},
            {name:"家禽",id:7}, 
            {name:"面食",id:6}, 
            {name:"快餐",id:5},
            {name:"沙拉",id:8},],
    dataArr:[],
    selectedContentIndex: 0, // 默认选中第一个标签
    minfenlie_index:0, // 二级分类
    iszhankai:false, //控制全部分类的展开
  },
  onTagSelect(e){ // 点击一级分类
     
    // 更新选中的标签索引
    const index = e.currentTarget.dataset.index; // 一级分类数组索引
    console.log(index);
    this.setData({
      selectedContentIndex: index,
      erjifenl: this.data['erjifenl' + index]
    });
    setTimeout(() => {
      this.setData({
        iszhankai:false
      })
    }, 50);
    var yemathis = this
    yemathis.data.pagenum=1
    yemathis.setData({
      dataArr: []
    });
     
   
  this.getData();
  },

  on_left_item_bind(e){ //点击二级标签
    
    const index = e.currentTarget.dataset.event
    console.log(index);
    this.setData({
      minfenlie_index: index
    })
    var yemathis = this
    yemathis.data.pagenum=1
    yemathis.setData({
      dataArr: []
    });
     
     
  yemathis.getData()
  },
  on_zhangkai_bind(){//点击全部展开
    this.setData({
      iszhankai:true
    })
  },
  on_shouqi_bind(){ //点击收起
    this.setData({
      iszhankai:false
    })
  },
  on_liebiaoitem_bind(e){ // 点击列表数据的每一项
    console.log("菜谱为什么不跳转");
    console.log(e.currentTarget.dataset.event);//数据列表数组索引
    const index = e.currentTarget.dataset.event;
    wx.navigateTo({
      url: '../dish1/dish1',
      data:{
        id:this.data.dataArr[index].id
      }
    })
    
  },
     
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    const index=options.zhi
    if(options.zhi!=null){
      console.log("recipe");
      console.log(options.zhi);
      this.setData({
        selectedContentIndex:index
      })
    }
    var yemathis = this
    yemathis.setData({
      dataArr: []
    });
     
   
    yemathis.getData();
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
  on_dianji(){
   
    wx.navigateTo({
      url: '/pages/dish/dish',
    })
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
     this.setData({
       dataArr:[]
     })
     this.data.pagenum=1
     this.getData()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom (){
    
   
       this.data.pagenum++
     
    this.getData();
  },
  async getData() {
    const yemathis = this;
    await getall({
      firstid: yemathis.data.selectedContentIndex, // 默认选中第一个标签
      secondid: yemathis.data.minfenlie_index,
      pagenum: yemathis.data.pagenum,
      pagesize: yemathis.data.pagesize
    }).then(res => {
      yemathis.data.total=res.total
      let imgBash = app.globalData.srcBash;
      let newDataArr = [...yemathis.data.dataArr, ...res.data.list];
      yemathis.setData({
       
        dataArr: newDataArr
      });

     
    });
  },
  // 其他函数...

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})