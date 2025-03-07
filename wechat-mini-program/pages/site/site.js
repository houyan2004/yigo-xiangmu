// pages/adeer/adeer.js
const app = getApp()
const URLBash = app.globalData.srcBash
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url_bash:URLBash,
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /* 地址数据结构
    *id
    *name,mobile电话号码，address地址，street详细地址，
    *isDrfault默认选择，checked选中哪个地址
    */
  //  for(var i=0;i<3;i++){
  //    var address = {};
  //    address.id = "" +  (1+i);
  //    address.name = "张"+ (1+i);
  //    address.mobile="1332561514"+ (1+i);
  //    address.city="成都理工大学工程技术学院";
  //    address.street="天安门"+ (1+i) +"号";
  //    address.isDefault=false;
  //    address.checked=false;
  //    if(i==0){
  //      address.isDefault=true;
  //    }
      
  //    this.data.addressList.push(address);
  //   //  console.log(addressList);
  //  }
  this.setData({
       addressList:this.data.addressList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    var addressList=wx.getStorageSync('addressList');
    var address=null;//获取默认选中地址
    if(addressList&&addressList.length>0){
      addressList.forEach(function(v,index){
        if(v.isDefault){
          address=addressList.splice(index,1)[0];
        }
      })
      this.setData({
        addressList:[address,...addressList]
      })
    }else{
      this.setData({
        addressList:[]
      })
    }
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
  //默认地址选中点击事件
clickDefault(e){
  var index = e.currentTarget.dataset.index;
  this.data.addressList.forEach(function(v){
    v.isDefault = false;
  });
  this.data.addressList[index].isDefault = true;
  //将默认选中的放在列表第一个位置
  var address = this.data.addressList.splice(index, 1)[0];
  console.log(address);
  this.data.addressList.unshift(address); // 使用 unshift 来将地址添加到数组的开头
  //正常地址中按照时间排序（未设置）
  this.setData({
    addressList: this.data.addressList
  });
  console.log(this.data.addressList); // 使用 this.data.addressList
},

  //删除点击事件
  clickDelete(e){
     var index =e.currentTarget.dataset.index;
     this.data.addressList.splice(index,1);
     this.setData({
        addressList:this.data.addressList


     })
    
  },
  //编辑点击事件
  clickEdit(e){
     var index=e.currentTarget.dataset.index;
     var  address=this.data.addressList[index];
     console.log(address);
     wx.navigateTo({
      url: '../addressedit/addressedit?address=' +JSON.stringify(address),
     })
    
  },
  //添加
  clickAdd(e){
    wx.navigateTo({
      url: '../addressedit/addressedit',
    })
    
  },
})