// pages/addressedit/addressedit.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //新建地址时的默认值
    address:{
      id:0,
      name:'',//收货人姓名
      mobile:'',//收货人手机号
      city:'',//收货人所在城市
      street:'',//具体到街道，门牌号
      isDefault:false,
      checked:false,
    },
    bourn:'https://mp-8dd34d12-2d1e-44ef-b563-4e772d50f668.cdn.bspapp.com/yigo/ljx/images/目的地2.png'//那个选择所在地址的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
     that=this;
    console.log(options.address)
    this.setData({
      address:JSON.parse(options.address)
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
  //验证地址信息方法
  checkAddress(){
      var address=this.data.address;
      var tipStr="";
      if(address.name.length==0){
         tipStr="请填写收货人姓名"
      }
     else if(address.mobile.length==0){
        tipStr="请填写手机号"
     }
     else if(address.city.length==0){
      tipStr="请填写收货人所在地址"
   }
     else if(address.street.length==0){
    tipStr="请填写收货人详细地址"
 }
  if(tipStr.length==0){
     return true;
  }else{
    wx.showToast({
      icon:'none',
      title: tipStr,
    })
    return false;
  }
  },
  inputName(e){
     this.data.address.name=e.detail.value;
     this.setData({
       address:this.data.address
     })
  },
  inputMobile(e){
    this.data.address.mobile=e.detail.value;
    this.setData({
      address:this.data.address
    })
  },
  inputStreet(e){
    this.data.address.street=e.detail.value;
    this.setData({
      address:this.data.address
    })
  },
  bindRegionChange(e){
    var city=e.detail.value;
    this.data.address.city=city.join(" ");
    
    this.setData({
      address:this.data.address,
      
    })
    
  },
  clickDefault(){
    if(this.data.address.isDefault){
      this.data.address.isDefault=false;
    }  else{
      this.data.address.isDefault=true;
    }
    this.setData({
      address:this.data.address
    })
  },
  clickAdd(){
    if(!this.checkAddress()){
         return
    }
    // 暂时把数据保存在本地
    var addressList=wx.getStorageSync('addressList');
    var address=this.data.address;
    var isAdd=false;//是否添加地址
    var addressListNew=[];
    var indexDefault=-1;//默认选中地址的索引
    var indexCurrent=-1;//如果是编辑地址，获取当前编辑地址在地址列表中索引
    if(address.id==0){
      //新建地址
      isAdd=true;
      //生成一个地址id
      address.id=Math.floor(Math.random()*1000+1);
      if(addressList){
        addressList.forEach(function(v,index){
          if(v.isDefault){
            indexDefault=index;
          }
          //如果当前地址默认选中了，将以前的默认地址取消
          if(address.isDefault){
            v.isDefault=false;
          }
        })
      }
      addressListNew=[address,...addressList];
      console.log("***************");
      console.log(addressListNew);
      indexCurrent=0;
    }else{
      addressList.forEach(function(v,index){
        if(v.isDefault){
          indexDefault=index;
        }
        //如果当前地址默认选中了，将以前的默认地址取消
        if(address.isDefault){
          v.isDefault=false;
        }
        //如果是同一个地址，给旧的地址更新
        if(address.id==v.id){
          v.name=address.name;
          v.mobile=address.mobile;
          v.city=address.city;
          v.street=address.street;
          v.isDefault=address.isDefault;
          indexCurrent=index;
        }
      })
      addressListNew=addressList;
       
    }
    //如果新的地址列表中没有默认选中地址，就把当前地址设置为默认选中地址
    if(indexDefault==-1){
      addressListNew[indexCurrent].isDefault=true;
    }else{
      //如果是编辑地址，并且有选中默认地址，并且默认选中地址和当前编辑编制地址是同一个，那么将当前地址设置为默认选中
      if(indexDefault==indexCurrent&&!isAdd){
          addressListNew[indexCurrent].isDefault=true;
      }
    }
     
    wx.setStorageSync('addressList', addressListNew)
    console.log("***************");
      console.log(addressListNew);
      console.log(addressList);
     
    wx.showToast({
      title: '保存成功',
      icon:'succes',
      success(){
        wx.navigateBack({
          delta:0,
        })
      }
    })
    
  },
  clickLocation(){
     
     //点击选择位置
     wx.authorize({
       scope: 'scope.userLocation',
       success(e){
         wx.getLocation({
            type:'gcj02',
            success(location){
              wx.chooseLocation({
                success(res){
                  var address_info=res.address;
                  that.data.address.city=address_info;
                  
                  that.setData({
                    address:that.data.address
                  })
                }
              })
            }
         })
       }
     })
     
  },
})