// detail.js

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    //article = getApp().globalData.globallist[options.id]
    console.log(getApp().globalData.globallist)

    this.setData({
      article: getApp().globalData.globallist[options.id]
    })

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
  onShareAppMessage: function (res) {

    console.log('onShareAppMessage')
    console.log(res)
    console.log(this.data.article)

    return {
      title: this.data.article.title.rendered,
      path: '/pages/index/detail?id=' + this.data.article.id,
      success: function (res) {
        // 转发成功
        wx.showToast({ title: '分享已成功 !' })
        console.log('share succ')
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({ title: '分享失败 !' })
        console.log('share fail')
      }
    }
  }
})