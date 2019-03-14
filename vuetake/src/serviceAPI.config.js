const BASEURL =
  'https://www.easy-mock.com/mock/5c7619d342cc6b3a31f74293/vuetake/'
const LOCALURL = 'http://127.0.0.1:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户注册接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 用户注册接口
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类商品信息
}
module.exports = URL
