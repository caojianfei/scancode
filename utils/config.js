
var host = 'http://local.lpdchina.com';
var api = {
  login: host + '/api/login/login.html',
  getOrderInfo: host + '/api/Order/getOrderInfo.html',
  consumOrder: host + '/api/Order/consum.html',
}


module.exports.host = host;
exports.api = api;
