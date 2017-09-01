function checkLogin() {
  var user = wx.getStorageSync('user') || null;
  var session_id = wx.getStorageSync('session_id');
  //console.log(session_id);
  return user && session_id ? true : false;
}

function getSessionId(){
  if (checkLogin === false) {
    return null;
  }
  return wx.getStorageSync('session_id');
}

//服务端登录失效
function loginLoseEfficacy () {
  wx.clearStorage()
  wx.redirectTo({
    url: '/pages/index/index',
  })
}

function getUser() {
  if (checkLogin() === false) {
    return false;
  }
  return wx.getStorageSync('user');
}

module.exports.checkLogin = checkLogin;
exports.getUser = getUser;
exports.getSessionId = getSessionId;
exports.loginLoseEfficacy = loginLoseEfficacy;