
var app = getApp();
var api = app.config.api;

var common = require('../../utils/common.js');
//console.log(common);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    canUse: true,
    errorCode: null,
    errorImage: null,
    errorMsg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = new Date();
    var now = DATE.getTime();
    var self = this;
    var code = options.code;
    if (!code) {
      code = '46318944108768002CJF';
    }
    if (!code) {
      wx.showToast({
        title: 'query error!',
        image: '../../images/error.png'
      })
    } else {
      var url = api.getOrderInfo;
      var param = {
        code: code,
        session_id: common.getSessionId()
      };
      wx.request({
        url: url,
        data: param,
        method: 'POST',
        dataType: 'json',
        success:  (res) => {
          //console.log(res);
          //console.log(self.data);
          var data = res.data;
          if (data.code !== 1) {
            wx.showToast({
              title: data.msg,
              image: '../../images/error.png',
              mask: true
            })
            if (data.code === 2000) {
              common.loginLoseEfficacy();
            }
          } else {
            var order = data.data;
            var consumNumRemainder = order.amount - order.consum_num;
            order.consumNumRemainder = consumNumRemainder;
            var errorCode = null, errorMsg = null, canUse = false,errorImage;
            if (order.order_status !== 1 && order.order_status !== 3) {
              errorCode = 1;
              errorMsg = '不是待核销的订单';
            }

            if (order.validStartTimestamp > now) {
              errorCode = 1;
              errorMsg = '该订单还未生效';
            }

            if (order.validEndTimestamp < now) {
              errorCode = 1;
              errorMsg = '该订单已经过期';
            }

            if (!(order.consum_num < order.amount)) {
              errorCode = 2;
              errorMsg = '该订单已经核销完成';
            }

            if (errorCode === null && errorMsg === null) {
              canUse = true;
            }

            if (errorCode === 1) {
              errorImage = '../../images/error1.png';
            }

            if (errorCode === 2) {
              errorImage = '../../images/forbidden.png';
            }

            self.setData({
              canUse: canUse,
              errorImage: errorImage,
              errorCode: errorCode,
              errorMsg: errorMsg,
              order: order
            })
          
          }
        },
        fail: function () {
          wx.showToast({
            title: 'query error!',
            image: '../../images/error.png'
          })
        }
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
    wx.navigateBack({
      delta: 1
    })
  },

  onFormSubmit: function (e) {
    wx.showLoading({
      title: 'loading....',
      mask: true
    })
    var data = e.detail.value;
    var consumNum = data.consum_num;
    var order = this.data.order;
    var reminderConsumNum = order.amount - order.consum_num;
    if (consumNum > reminderConsumNum) {
      wx.showToast({
        title: '核销份数不得大于可核销份数',
        image: '../../images/error.png'
      })
      return false;
    }

    if (consumNum < 1) {
      wx.showToast({
        title: '核销份数不得小于1',
        image: '../../images/error.png'
      })
      return false;
    }

    var param = {
      order_id: order.id,
      num: consumNum,
      session_id: common.getSessionId()
    }

    //发起核销
    wx.request({
      url: api.consumOrder,
      data: param,
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        var data = res.data;
        if (data.code !== 1) {
          // wx.showToast({
          //   title: data.msg,
          //   image: '../../images/error.png'
          // })
          if (data.code === 2000) {
            common.loginLoseEfficacy();
          }
          wx.redirectTo({
            url: '/pages/result/result?code=0&msg=' + data.msg,
          })
          return false;
        } else {
          wx.redirectTo({
            url: '/pages/result/result?code=1&msg=核销成功',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败！',
          image: '../../images/error.png'
        })
      }
    })
  }
})