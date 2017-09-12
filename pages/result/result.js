Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    mainInfo: '',
    secondInfo: '',
    btnType: 'default'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var code = options.code;
    var msg = options.msg;
    console.log(code);
    
    if (code == 1) {
      //console.log('核销成功');
      this.setData({
        image: '../../images/WeUI-success.png',
        mainInfo: '核销成功',
        secondInfo: msg,
        btnType: 'primary'
      });
    } else {
      //console.log('核销失败');
      this.setData({
        image: '../../images/WeUI-error.png',
        mainInfo: '核销失败',
        secondInfo: msg
      });
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

  back: function () {
    wx.redirectTo({
      url: '/pages/scan/scan',
    })
  }
})