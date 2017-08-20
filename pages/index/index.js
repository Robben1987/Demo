//index.js
//获取应用实例
var app = getApp()
var color = "Cwindow";
var blogurl = "http://www.batigoal.cn/blog/wp-json/wp/v2/posts?per_page=1"
Page({
  data: {
    //初始化数据，作为第一次渲染，但是变量并不赋值
    motto: 'Hello World',
    userInfo: {},
    color:"Cwindow", 
    list: app.globalData.globallist,
  },

  clickChange:function(){
    console.log("click the words!");
    console.log(color);
    
    if(color == "Cwindow")
    {
      color = "Dwindow";//yellow
      console.log(color);
    }else if(color == "Dwindow"){
      color = "Cwindow";
      console.log(color);
    }
    this.setData({color});
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /*delHtmlTag:function () {
    var reTag = /<(?:.|\s)*?>/g
    return str.replace(reTag, "")//去掉所有的html标记
  }, */
  
  tapTitle: function (event) {
    console.log('tapTitle to details...')
    console.log(event)    
    wx.navigateTo({
      url: 'detail?id=' + event.currentTarget.id
    })
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
  
  // get request
  wx.request({
  url: blogurl,
  /*data:{
    per_page:1
  },*/
  success: function(res) {
    console.log(res)
    console.log(res.data)
    var items = []
    for (var i=0;i<res.data.length;i++)
    {
      console.log(res.data[i].title.rendered)
      console.log(res.data[i].excerpt.rendered)
      console.log(res.data[i].content.rendered)
      console.log(res.data[i].link)
      //items.push(res.data[i].content.rendered.replace(/<[^>]+>/g, ""))

      res.data[i].excerpt.rendered = res.data[i].excerpt.rendered.replace(/<[^>]+>/g, "")
      res.data[i].excerpt.rendered = res.data[i].excerpt.rendered.replace(/\[.+\]/g, "[...]")
      res.data[i].content.rendered = res.data[i].content.rendered.replace(/<[^>]+>/g, "")
      //res.data[i].content.rendered = res.data[i].content.rendered.replace(/<(img|IMG)[^\<\>]*>/g, "")

      console.log(res.data[i].title.rendered)
      console.log(res.data[i].excerpt.rendered)
      console.log(res.data[i].content.rendered)
      console.log(res.data[i].link)
    }
    //console.log(items)
    app.globalData.globallist = res.data
    that.setData({
      list: app.globalData.globallist
    })
    console.log(app.globalData.globallist)
  },
  complete: function() {
    console.log("request done")
  },
  })

  },
  onReady: function() {
    // Do something when page ready.
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
  onPullDownRefresh: function() {
    // Do something when pull down.
    console.log('onPullDownRefresh');
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    console.log('onReachBottom');
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
   console.log('onShareAppMessage');
  },
})
