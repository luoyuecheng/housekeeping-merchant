export const host = 'http://192.168.99.161:8080';

export const loginInterface = {
  addGoodsApi: '/wx/goods/add',
  loginApi: '/wx/auth/login', // 登录接口
  register: '/wx/auth/register', // 注册
  getfirstcategory: '/wx/catalog/getfirstcategory', // 查询一级类目
  getsecondcategory: '/wx/catalog/getsecondcategory', // 查询二级类目
  uploadApi: '/wx/storage/upload', // 图片上传
  queryGoodsApi: '/wx/goods/user/show', // 查询所有商品/服务
}