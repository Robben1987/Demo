//index.js
//获取应用实例
var app = getApp()
var color = "Cwindow"
var blogurl = "https://www.batigoal.cn/blog/wp-json/wp/v2/posts"
var allRefresh = true
Page({
  data: {
    sysInfo: {},
    userInfo: {},
    list: app.globalData.globallist,
    perPage: 5,
    pageIndex: 1,
  },

  /*------------------------------------------*/
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    if(allRefresh){
      //this.getRequest(this.data.pageIndex, true)
      this.pullDown()
      allRefresh = false
      console.log('retrive all the list');
    }
  },
  onReady: function() {
    // Do something when page ready.
    var res = wx.getSystemInfoSync()
    this.setData({
      sysInfo: res
    })
    console.log(res)
    console.log('onReady');
  },
  onShow: function() {
    // Do something when page show.
    console.log('onShow');
  },
  onHide: function() {
    // Do something when page hide.
    console.log('onHide');
  },
  onUnload: function() {
    // Do something when page close.
    console.log('onUnload');
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
   console.log('onShareAppMessage');
  },
  onPullDownRefresh: function () {
    console.log('Pull Down 1')
    //do 
    this.pullDown()
    wx.stopPullDownRefresh()
    console.log('Pull Down 3')

  },
  onReachBottom: function () {
    console.log('Pull Up 1')
    //do 
    this.pullUp()
    wx.stopPullDownRefresh()
    console.log('Pull Up 3')
  },
  
  /*------------------------------------------*/
  // get request
  getRequest:function(para,rebuild){
    var that = this

    wx.request({
      url: blogurl,
      data:{per_page:this.data.perPage.toString(),page:para.toString()},
      success: function (res) {
        console.log(res)
        
        if(rebuild){
          //app.globalData.globallist.splice(0, app.globalData.globallist.length)
          app.globalData.globallist.length = 0
        }
        if(res.statusCode == 200){   
          for (var i = 0; i < res.data.length; i++) {
            /*console.log(res.data[i].title.rendered)
            console.log(res.data[i].excerpt.rendered)
            console.log(res.data[i].content.rendered)
            console.log(res.data[i].link)*/

            res.data[i].excerpt.rendered = res.data[i].excerpt.rendered.replace(/<[^>]+>/g, "")
            res.data[i].excerpt.rendered = res.data[i].excerpt.rendered.replace(/\[.+\]/g, "[...]")
            res.data[i].content.rendered = res.data[i].content.rendered.replace(/<[^>]+>/g, "")
            //res.data[i].content.rendered = res.data[i].content.rendered.replace(/<(img|IMG)[^\<\>]*>/g, "")

            /*console.log(res.data[i].title.rendered)
            console.log(res.data[i].excerpt.rendered)
            console.log(res.data[i].content.rendered)
            console.log(res.data[i].link)*/
            
            app.globalData.globallist.push(res.data[i])
          }
          //app.globalData.globallist = res.data
          console.log("pageIndex " + that.data.pageIndex)
          that.setData({
            list: app.globalData.globallist,
            pageIndex: para + 1
          })
          console.log("request succ")
        }else{
          console.log("request code " + res.statusCode)//400
          //
          that.setData({
            pageIndex: 0xffffffff
          })
        }
        //console.log(app.globalData.globallist)
      },
      fail: function () {
        console.log("request fail")
        
      },
      complete: function () {
        console.log("request done")
        wx.hideLoading()
      },
    })
  },
  /* */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /*delHtmlTag:function () {
    var reTag = /<(?:.|\s)*?>/g
    return str.replace(reTag, "")//去掉所有的html标记
  }, */
  /* */
  tapTitle: function (event) {
    console.log('tapTitle to details...')
    console.log(event)
    wx.navigateTo({
      url: 'detail?id=' + event.currentTarget.id
    })
  },

  pullDown:function(){
    wx.showLoading({ title: '玩命下拉中...'},)
    this.setData({
      pageIndex: 1
    })
    this.getRequest(this.data.pageIndex, true)
  },
  pullUp: function () {
    if(this.data.pageIndex != 0xffffffff) {
      wx.showLoading({ title: '玩命加载中...' }, )
      this.getRequest(this.data.pageIndex, false)
    }else
    {
      wx.showToast({ title: '到底了, 亲 !'})
      console.log('the blog end...')  
    }
  },
})

/*
wx.showLoading({
  title: '加载中',
})

setTimeout(function () {
  wx.hideLoading()
}, 2000)
*/