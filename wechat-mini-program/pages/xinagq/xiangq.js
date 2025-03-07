Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected: [false, false, false, false, false], // // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
    active: null, // 当前展开的项的index值
    listDatas: [
      {
        list_name: '简介',
        list_content:
          '颐购，您的智能厨房伴侣，旨在为您提供一站式的烹饪与购物体验。通过这个小程序，您不仅能浏览到丰富的菜谱资源，还能直接根据菜谱选购所需食材，让您的烹饪之旅变得更加便捷和愉悦 核心功能包括海量菜谱资源、智能食材清单、一键购买食材、个性化推荐、社区交流以及健康营养分析。颐购收录了成千上万的菜谱，覆盖了从传统家常菜到国际美食的各类菜式，满足不同口味和烹饪水平的需求。每道菜谱都附带详细的食材清单和分量，您可以一键查看，清晰了解每道菜的制作材料。直接从菜谱页面选购食材，颐购与多家供应商合作，提供新鲜、优质的食材，一键下单，直接送货上门。根据您的烹饪历史和喜好，颐购会智能推荐菜谱，帮助您发现新的美食灵感。颐购还设有社区功能，用户可以分享自己的烹饪成果，交流烹饪心得，让您的烹饪之路不再孤单。每道菜谱都提供营养信息，帮助您做出更健康的饮食选择。',
      },

      {
        list_name: '开发者',
        list_content: '成都理工大学工程技术学院海底小纵队分队',
      },

      {
        list_name: '微信ID',
        list_content: '110120119@qq',
      },

      {
        list_name: '微信公众号',
        list_content: '颐购',
      },

      {
        list_name: '其他业务',
        list_content:
          '选择颐购的理由包括便捷性、高效性、互动性和可靠性。菜谱与购物紧密结合，省去分别查找菜谱和购买食材的麻烦；一键购买，节省时间，让您更快地享受烹饪乐趣；社区功能让您与同好交流，分享烹饪的乐趣；精选食材供应商，保证食材新鲜和品质。',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  // 点击列表,收缩与展示
  onListClick(event) {
    let index = event.currentTarget.dataset.index;
    let active = this.data.active;

    this.setData({
      [`selected[${index}]`]: !this.data.selected[`${index}`],
      active: index,
    });

    // 如果点击的不是当前展开的项，则关闭当前展开的项
    // 这里就实现了点击一项，隐藏另一项
    if (active !== null && active !== index) {
      this.setData({
        [`selected[${active}]`]: false,
      });
    }
  },
});