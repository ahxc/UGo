import {login, storage} from "../../utils/utils"
import {getToken} from "../../request/auth"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleUserInfo(e){
    try {
      const {encryptedData, rawData, iv, signature} = e.detail;
      const {code} = await login();
      /* 组成token */
      const params = {encryptedData, rawData, iv, signature, code};
      const token = "sdfreujewvndsvherbffj"//await getToken(params);
      storage.save("token", token);
      wx.navigateBack({/* 同时向上返回一个页面 */
        delta: 1
      });
    }
    catch (err) {
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