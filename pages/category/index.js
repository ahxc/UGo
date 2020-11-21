import {getCategory} from "../../request/category"

Page({
  /**
   * 页面的初始数据
   */
  // 小程序无法直接通过this调用数据
  data: {
    catData: [],
    leftCateList: [],
    rightItems: [],
    cIndex: 0,
  },

  handleIndex(e) {
    let cIndex = e.currentTarget.dataset.operation;
    let rightItems = this.data.catData[cIndex].children;
    this.setData({
      cIndex,
      rightItems/* 也可以用字面量增强写法 */
    });
  },

  getCategory() {
    getCategory()
    .then(result => {
      let catData = result.data.message;
      this.setData({
        catData,
        rightItems: catData[this.data.cIndex].children,
        leftCateList: catData.map(v => v.cat_name)
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync("catData");
    if(!cates) {
      this.getCategory()
    } 
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