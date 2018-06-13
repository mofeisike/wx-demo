Page({

  /**
   * 页面的初始数据
   */
  data: {
    double:['','','','','']
    
  },

  
  jump: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../user/user?id=' + e.currentTarget.id,
      success: function (res) {
        console.log('跳转到news页面成功')// success
      },
      fail: function () {
        console.log('跳转到news页面失败')  // fail
      },
      complete: function () {
        console.log('跳转到news页面完成') // complete
      }
    })
  }
})