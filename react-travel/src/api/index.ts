// 产品推荐
export const productListApi =
  "http://123.56.149.216:8080/api/productCollections";

// 根据产品 ID 获取产品详情
export const productInfo = "http://123.56.149.216:8080/api/touristRoutes/";

// 搜索关键词查询
export const searchInfo = "http://123.56.149.216:8080/api/touristRoutes";

// 用户注册
export const register = "http://123.56.149.216:8080/auth/register";

// 用户登录
export const login = "http://123.56.149.216:8080/auth/login";

// 获取购物车列表
export const shoppingCartList = "http://123.56.149.216:8080/api/shoppingCart";

// 删除购物车中的商品
export const delGoodsInShoppingCart =
  "http://123.56.149.216:8080/api/shoppingCart/items/";

// 添加商品到购物车
export const addGoodsInShoppingCart =
  "http://123.56.149.216:8080/api/shoppingCart/items";

// 购物车结算
export const shoppingCartPay =
  "http://123.56.149.216:8080/api/shoppingCart/checkout";

// 订单支付
export const payOrderApi = (orderId) =>
  `http://123.56.149.216:8080/api/orders/${orderId}/placeOrder`;
