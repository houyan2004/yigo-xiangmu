const app = getApp()
const URLBash = app.globalData.srcBash
Page({
  data: {
    content: '',
    keyvalue: '-1',
    // 当前登录者信息
    login: {
      id: '2023',
      user: '大猪蹄子',
      avatar: app.globalData.userInfo.touxianimg,
    },
    // 聊天信息
    chatList: [
      {
        msgId: '2022',
        nickname: '机器人客服',
        avatar: URLBash+'/ljx/images/kefu.png',
        message: '亲，很高兴为您服务，请问您要咨询什么问题呢？请选择您要询问的问题编号\n1. 小程序里面的东西都新鲜吗？\n2. 今日推荐里面的商品会更加便宜吗？\n3. 什么时候发货？\n4. 什么时候到？',
        type: 'text'
      }
    ],
    // 机器人客服的回答
    answers: [
      '所有商品都是当天新鲜采购的，您可以放心购买！',
      '今日推荐的商品会有额外的折扣或优惠活动，价格更实惠哦！',
      '您的订单会在下单后的24小时内发货，请耐心等待！',
      '发货后，根据您的地址，通常需要3-5天送达，请注意查收！'
    ]
  },
  onLoad() {
    this.scrollToBottom();
  },
  // 输入监听
  inputClick(e) {
    this.setData({
      content: e.detail.value
    });
  },
  // 发送监听
  sendClick() {
    var that = this;
    var list = this.data.chatList;
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minu = date.getMinutes();
    var now1 = month < 10 ? '0' + month : month;
    var now2 = day < 10 ? '0' + day : day;

    // 用户发送的消息
    var userMsg = {
      msgId: this.data.login.id,
      nickname: this.data.login.user,
      avatar: this.data.login.avatar,
      message: this.data.content,
      type: 'text',
      date: now1 + '-' + now2 + ' ' + hour + ':' + minu
    };

    // 添加用户消息到聊天列表
    this.setData({
      chatList: list.concat(userMsg)
    }, () => {
      that.scrollToBottom();

      // 根据用户输入的数字返回机器人客服的回答
      var inputNumber = parseInt(this.data.content.trim(), 10);
      if (!isNaN(inputNumber)) {
        if (inputNumber >= 1 && inputNumber <= this.data.answers.length) {
          var botMsg = {
            msgId: '2022',
            nickname: '机器人客服',
            avatar: URLBash+'/ljx/images/kefubeijing.png',
            message: this.data.answers[inputNumber - 1],
            type: 'text',
            date: now1 + '-' + now2 + ' ' + hour + ':' + minu
          };
          that.setData({
            chatList: that.data.chatList.concat(botMsg)
          }, () => {
            that.scrollToBottom();
          });
        } 
          
         else {
           
           var botMsg = {
            msgId: '2022',
            nickname: '机器人客服',
            avatar: URLBash+'/ljx/images/kefubeijing.png',
            message: '若没有解决问题，请添加客服微信进行询问',
            type: 'image',
            imageUrl: URLBash+'/ljx/images/kefuerweuma.png',
            date: now1 + '-' + now2 + ' ' + hour + ':' + minu
          };
          that.setData({
            chatList: that.data.chatList.concat(botMsg)
          }, () => {
            that.scrollToBottom();
          });
        }
      } else {
        console.warn("用户输入的编号无效");
      }

      // 清空输入框
      that.setData({
        content: ''
      });
    });
  },
  // 滑动到最底部
  scrollToBottom() {
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop: 200000,
        duration: 3
      });
    }, 600);
  },
 

});