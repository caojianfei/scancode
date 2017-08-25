
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
        console.log(res);
        if (data.code === 1) {
          wx.showModal({
            title: 'success',
            content: 'login success',
          })
        } else {
          wx.showModal({
            title: 'error',
            content: data.msg ? data.msg : 'unknow error'
          })
        }
        wx.hideLoading();
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