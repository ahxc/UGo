import {storage, showModal, showToast} from "../../utils/utils"
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
    let {address, totalNum} = this.data;
    if(!totalNum){
      await showToast({title: "还没有选择任何商品", icon: "none"});
      return;
    }
    if(!address.userName){
      await showToast({title: "还没有选择收货地址", icon: "none"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
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
    let cart_checked = cart.filter(v => {
      return v.goods_checked
    })
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