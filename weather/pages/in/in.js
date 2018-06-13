// pages/in/in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city : "",
    today : "",
    future : "",
    temp :"",
    ganmao:"",
  },

  onLoad: function (options) {
    this.loadInfo();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  loadInfo : function(){
    var page = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude);
      }
    })
  },

  loadCity: function (latitude, longitude){
    var page = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=LIkYxythH2yrgUE42GfgtkY56cLtTb51&location=' + latitude + ',' + longitude + '&output=json&pois=0',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        var city = res.data.result.addressComponent.city;
        city=city.replace("市","");
        page.setData({city:city});
        page.loadWeather(city);
      }
    })
  },

  loadWeather: function(city){
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      success: function (res) {
        console.log(res);
        // 减掉当天的天气
        var future = res.data.data.forecast;
        var todayInfo = future.shift();//删除第一个
        var today = res.data.data;
        // future就剩下4个,
        today.todayInfo = todayInfo;
        page.setData({ today: today, future: future, temp:today.wendu,ganmao:today.ganmao})
      }
    })
  }
})

