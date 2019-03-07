const BASEURL =
  'https://www.easy-mock.com/mock/5c7619d342cc6b3a31f74293/vuetake/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户注册接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo' // 用户注册接口
}
module.exports = URL
