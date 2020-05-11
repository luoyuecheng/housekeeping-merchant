// export const host = 'http://192.168.99.161:8080';
// export const host = 'http://97cf53d1.ngrok.io';
export const host = 'http://47.90.188.234:8080';

export const loginInterface = {
  addGoodsApi: '/wx/goods/add',
  loginApi: '/wx/auth/login', // 登录接口
  logoutApi: '/wx/auth/logout', // 退出登录
  register: '/wx/auth/register', // 注册
  getfirstcategory: '/wx/catalog/getfirstcategory', // 查询一级类目
  getsecondcategory: '/wx/catalog/getsecondcategory', // 查询二级类目
  uploadApi: '/wx/storage/upload', // 图片上传
  queryGoodsApi: '/wx/goods/user/show', // 查询所有商品/服务
  getGoodsDetailApi: '/wx/goods/detail', // 获取商品祥情
  getGoodsByParam: '/wx/goods/list', // 条件获取商品
  postAuthentication: '/wx/auth/authentication', // 认证信息
  getAuthentication: '/wx/auth/get/authentication', // 获取认证信息 POST
  refuseApi: '', // 拒单接口,
  receiveApi: '', // 接单接口
  addCard: '/wx/cart/fastadd', // 加入购物车
  // 用户收货地址
  deleteAddress: '/wx/address/delete', // 删除收货地址
  detailAddress: '/wx/address/detail', // 查看地址详情
  getAddressList: '/wx/address/list', // 收货地址列表
  saveAddress: '/wx/address/save', // 添加或更新收货地址
  // 订单操作
  queryOrder: '/wx/order/findOrder', // 查询订单列表
  getOrderDetail: '/wx/order/detail', // 查询订单详情
  submitOrder: '/wx/order/submit', // 提交订单
  updateOrderStatus: '/wx/order/updateStatus', // 更新订单状态
  // 通知
  getNotice: '/wx/auth/get/notice', // 获取通知
}