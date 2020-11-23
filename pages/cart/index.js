import {openSetting, getSetting, chooseAddress, storage} from "../../utils/utils"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
  },

  async handleAddress() {
    let r1 = await getSetting();
    let scopeAddress = r1.authSetting["scope.address"];/* 注意此处调用方式 */
    if(scopeAddress===false){
      /* scopeAddress为false，用户拒绝过授权，先诱导用户打开授权页面 */
      await openSetting();
    }
    let a = await chooseAddress();
    a.complete = a.provinceName+a.cityName+a.countyName+a.detailInfo
    this.setData({
      address: a,
    });
    storage.save("address", a);/* 将选择的地址存入缓存 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: storage.fetch("address"),
    });
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