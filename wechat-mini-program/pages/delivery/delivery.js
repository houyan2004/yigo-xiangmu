// pages/delivery/delivery.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    //自定义标记点数组
     markers:[],
    //纬度
    latitude:'',
    //经度
    longitude:'',
  },
 onLoad: function() { 
  var that = this; 
 //  获取当前定位的经纬度信息
 wx.showLoading({
   title:"定位中",
   mask:true
 })
 wx.getLocation({
   type: 'gcj02',
   altitude:true,//高精度定位
   //定位成功，更新定位结果
   success: function (res) {
     var latitudee = res.latitude
     var longitudee = res.longitude
     that.setData({
       longitude:parseFloat(longitudee),
       latitude: parseFloat(latitudee),
     })
   },
   //定位失败回调
   fail:function(){
     wx.showToast({
       title:"定位失败",
       icon:"none"
     })
   },
   complete:function(){
     //隐藏定位中信息进度
     wx.hideLoading()
   }
 })
 }, 
 
})