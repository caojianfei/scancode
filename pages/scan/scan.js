
var common = require('../../utils/common.js');
//console.log(common);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isLogin = common.checkLogin();
    //console.log(isLogin);
    if (!isLogin) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
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
    //console.log(getCurrentPages());
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
  onShareAppMessage: function () {
    
  },

  scanCode: function () {
    wx.scanCode({
      success: function (res) {
        var code = res.result;
        wx.navigateTo({
          url: '/pages/info/info?code=' + code,
          //url: '/pages/info/info'
        })
        console.log(res)
      },

      fail: function() {
        wx.showToast({
          title: 'error',
          image: '../../images/error.png'
        })
      }
    })
  }
})