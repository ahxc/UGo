import {storage, showModal, showToast} from "../../utils/utils"
import {getOrders, getPay, getCheckOrder} from "../../request/pay"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart_checked: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  async handlePay() {
    const token = storage.fetch("token");
    if(!token){/* 没有token先拉取授权页面 */
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result) => {
        },
      });
      return;
    }
    try {
      /* 创建订单 */
      /* 1.请求头 */
      // const header = {Authorization: token};封装至基本request请求中
      /* 2.请求体 */
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address;
      /* 3.创建商品订单 */
      const goods = [];
      this.data.cart_checked.forEach(e => {
        goods.push({
          goods_id: e.goods_id,
          goods_number: e.goods_num,
          goods_price: e.goods_price,
        })
      });
      const params = {order_price, consignee_addr, goods}/* 商品信息 */
      const {order_number} = await getOrders(params);/* 获取相关商品信息的订单参数 */
      const {pay} = await getPay({order_number});/* 获取支付参数 */
      await requestPayment(pay);/* 发起微信支付 */
      const res = await getCheckOrder({order_number});/* 查询订单状态 */
      await showToast({title: "支付成功"});
      let newCart = storage.fetch("cart");/* 删除勾选过的商品 */
      newCart = newCart.filter(e => !e.goods_checked);
      storage.save("cart", newCart);

      wx.navigateTo({/* 跳转到订单页面 */
        url: '/pages/order/index',
      });
    }
    catch (err) {/* 有一步出错则都失效 */
      await showToast({title: "支付失败"})
      console.log(err);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let address = storage.fetch("address");
    let cart = storage.fetch("cart") || [];
    let totalPrice = 0;
    let totalNum = 0;
    let cart_checked = cart.filter(v => v.goods_checked)
    cart_checked.forEach(v => {
      totalPrice+=v.goods_price*v.goods_num;
      totalNum+=v.goods_num;
    })
    this.setData({
      cart_checked,
      address,
      totalPrice,
      totalNum,
    });
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

  }
})