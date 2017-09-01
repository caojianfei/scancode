
Page({

  formSubmit: (e) => {

    let formValues = e.detail.value;
    //验证数据
    let username = formValues.username;
    let password = formValues.password;
    if (!username) {
      wx.showModal({
        title: 'warning',
        content: 'username can not be empty',
        showCancel: false,
        confirmText: 'ok'
      })
      return false;
    }

    if (!password) {
      wx.showModal({
        title: 'warning',
        content: 'password can not be empty',
        showCancel: false,
        confirmText: 'ok'
      })
      return false;
    }

    wx.showLoading({
      title: 'loading',
      mask: true
    })

    wx.request({
      url: 'http://local.lpdchina.com/api/login/login.html',
      data: formValues,
      method: 'POST',
      success: (res) => {
        let data = res.data;
        if (data.code === 1) {
          //console.log(res.data)
          let user = data.data.user;
          wx.setStorageSync('user', user);
          wx.setStorageSync('session_id', data.data.session_id);
          wx.showToast({
            title: 'login success',
            mask: true
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/scan/scan',
            })
          }, 1000);
        } else {
          wx.showModal({
            title: 'error',
            content: data.msg ? data.msg : 'unknow error'
          })
          wx.hideLoading();
        }
      },
      fail: () => {
        wx.showModal({
          title: 'error',
          content: 'some error occurred！',
        })
        wx.hideLoading();
      }
    })
  },


})